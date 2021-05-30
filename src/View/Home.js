import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import VenueCard from "../components/VenueCard";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import debounce from "lodash.debounce";
import Pagination from "../components/Pagination";
let currentPage = 1;
function useDebounce(callback, delay) {
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay] // will recreate if delay changes
  );
  return debouncedFn;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(() => "Events");
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [code, setCode] = useState("");
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const event_favorites = useSelector((state) => state.event_favorites);
  const debouncedSave = useDebounce((tab, nextValue, code) => {
    getData(tab, nextValue, code);
    console.log(code);

    setCode(code);
  }, 1000);

  const debouncedSave2 = useDebounce((tab, nextValue, keyword) => {
    getData(tab, keyword, nextValue);
    setKeyword(keyword);
  }, 1000);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value: nextValue } = event.target;
    debouncedSave(activeTab, nextValue, code);
    setKeyword(nextValue);
  };

  const handleChange2 = (event) => {
    const { value: nextValue } = event.target;
    debouncedSave2(activeTab, nextValue, keyword);
    setCode(nextValue);
  };

  const pagination = (name) => {
    if (name === "increment") {
      currentPage += 1;
      getData(activeTab, keyword, code);
    } else if (name === "decrement") {
      currentPage -= 1;

      getData(activeTab, keyword, code);
    }
  };

  const getData = async (tab, keyword = "", code = "") => {
    console.log(keyword);
    console.log(code);
    console.log(tab);
    let key = process.env.REACT_APP_API_KEY;
    setisLoading(true);
    let url = tab.toLocaleLowerCase() + ".json?";
    if (code && !keyword) {
      console.log("code");
      url += "countryCode=" + code;
    } else if (!code && keyword) {
      console.log(!code && keyword);
      url += "keyword=" + keyword;
    } else if (code && keyword) {
      console.log("code && keyword");
      url += "countryCode=" + code + "&keyword=" + keyword;
    }
    url += "&apikey=" + key + "&page=" + currentPage;
    console.log(url);
    const res = await axios.get(url);
    let data = await res.data;
    // console.log(data);
    setCount(data.page.totalElements);
    setTotal(data.page.totalPages);
    if (data.page.totalElements === 0 || !data._embedded) {
      setData([]);
      setisLoading(false);
      return;
    }
    if (tab === "Events") await setData(res.data._embedded.events);
    else await setData(res.data._embedded.venues);

    setisLoading(false);
  };
  useEffect(() => {
    getData(activeTab);
  }, []);

  const Events = () => {
    if (count === 0) {
      return (
        <div className="noData">
          <p>NO EVENT FOUND</p>
        </div>
      );
    }
    return data.map((item) => (
      <Card
        key={item.id}
        id={item.id}
        image={item.images[0].url}
        date={item.dates.start.localDate}
        name={item.name}
        time={item.dates.start.localTime}
      />
    ));
  };

  const Venues = () => {
    if (count === 0) {
      return (
        <div className="noData">
          <p>NO VENUE FOUND</p>
        </div>
      );
    }
    return data.map((item) => (
      <VenueCard
        key={item.id}
        id={item.id}
        // image={item.images[0].url}
        image={item.images && item.images[0].url}
        name={item.name}
        city={item.city && item.city.name}
        state={item.state && item.state.name}
      />
    ));
  };
  return (
    <div className="home-wrapper">
      {console.log(activeTab)}
      {/* {console.log(keyword)}
      {console.log(code)} */}
      <header>
        <form className="search-container">
          <input
            type="text"
            value={code}
            className="search-bar search-bar-adjust"
            placeholder="Search by Country Code"
            onChange={handleChange2}
            // onChange={(e) => setCode(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                getData(activeTab, keyword, code);
              }
            }}
          />
          <input
            type="text"
            className="search-bar"
            value={keyword}
            placeholder="Search for Event or Venue"
            // onChange={(e) => setKeyword(e.target.value)}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                getData(activeTab, keyword, code);
              }
            }}
          />
          <img
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            alt="search-bar"
            onClick={() => getData(activeTab, keyword, code)}
          />
        </form>

        <ul className="nav-link">
          <li>
            <NavLink activeClassName="activeRoute" to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="activeRoute" to="/favorites" exact>
              Favorites
            </NavLink>
          </li>
        </ul>
      </header>

      <div className="tabs">
        <button
          className={activeTab === "Events" ? "active-tab" : ""}
          onClick={() => {
            currentPage = 1;
            setCode("");
            setKeyword("");
            setActiveTab("Events");
            getData("Events");
          }}
        >
          Event
        </button>
        <button
          className={activeTab === "Venues" ? "active-tab" : ""}
          onClick={() => {
            currentPage = 1;

            setCode("");
            setKeyword("");
            setActiveTab("Venues");
            getData("Venues");
          }}
        >
          Venue
        </button>
      </div>

      <div className="query">
        {code || keyword ? (
          <React.Fragment>
            Search result for {code && "Country Code: " + code.toUpperCase()}{" "}
            {keyword && "& Keyword: " + keyword}
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
      </div>
      <div className="data-wrapper">
        {isLoading ? (
          <p>Loading....</p>
        ) : activeTab === "Events" ? (
          Events()
        ) : (
          Venues()
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        lastPage={total}
        nextPage={() => pagination("increment")}
        prevPage={() => pagination("decrement")}
      />
    </div>
  );
}
