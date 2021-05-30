import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import VenueCard from "../components/VenueCard";
import { useSelector, useDispatch } from "react-redux";

export default function Home() {
  const [activeTab, setActiveTab] = useState(() => "Events");
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const event_favorites = useSelector((state) => state.event_favorites);
  const dispatch = useDispatch();

  const getData = async (tab) => {
    let key = process.env.REACT_APP_API_KEY;
    setisLoading(true);
    console.log(tab);
    console.log(tab.toLocaleLowerCase() + ".json?countryCode=US&apikey=" + key);
    const res = await axios.get(
      tab.toLocaleLowerCase() + ".json?countryCode=US&apikey=" + key
    );
    console.log(res);
    console.log(tab);
    if (tab === "Events") await setData(res.data._embedded.events);
    else await setData(res.data._embedded.venues);
    setisLoading(false);
  };
  useEffect(() => {
    getData(activeTab);
  }, []);

  const Events = () => {
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
    return data.map((item) => (
      <VenueCard
        key={item.id}
        image={item.images[0].url}
        name={item.name}
        city={item.city.name}
        state={item.state.name}
      />
    ));
  };
  return (
    <div className="home-wrapper">
      <header>
        <form className="search-container">
          <input
            type="text"
            className="search-bar search-bar-adjust"
            placeholder="Search by Country Code"
          />
          <input
            type="text"
            className="search-bar"
            placeholder="Search for Event or Venue"
          />
          <img
            className="search-icon"
            src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
            alt="search-bar"
          />
        </form>
      </header>
      {/* {console.log(event_favorites)} */}
      {/* {console.log(data)}
      {console.log(activeTab)} */}
      <div className="tabs">
        <button
          className={activeTab === "Events" ? "active-tab" : ""}
          onClick={() => {
            setActiveTab("Events");
            getData("Events");
          }}
        >
          Event
        </button>
        <button
          className={activeTab === "Venues" ? "active-tab" : ""}
          onClick={() => {
            setActiveTab("Venues");
            getData("Venues");
          }}
        >
          Venue
        </button>
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
    </div>
  );
}
