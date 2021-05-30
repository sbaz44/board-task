import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function ViewDetail() {
  let { idee, type } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);

  const getData = async () => {
    let key = process.env.REACT_APP_API_KEY;
    let url = type + "/" + idee + ".json?apikey=" + key;
    setisLoading(true);

    const res = await axios.get(url);
    let data = await res.data;
    console.log(res);
    await setData(data);
    setisLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="detail-wrapper">
      <header>
        <ul className="nav-link n-adjust">
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

      {isLoading ? (
        <div className="noData">Loading</div>
      ) : (
        <div className="data-wrapper">
          <h1>{data.name}</h1>
          <img className="event-img" src={data.images[0].url} />
          <p></p>
        </div>
      )}
    </div>
  );
}
