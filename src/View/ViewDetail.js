import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
          <div className="header">
            <p>{data.name}</p>
            <div className="img-container">
              <img
                className="event-img"
                src={data.images[0].url}
                alt="event-header"
              />
              <button>
                <a href={data.url} target="__blank">
                  Book
                </a>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="slider">
              <Carousel
                autoPlay
                infiniteLoop
                showArrows={false}
                showStatus={false}
                showIndicators={false}
                thumbWidth={120}
              >
                {data.images.map((item, index) => (
                  <img
                    className="event-img"
                    alt="events-slides"
                    key={index + 22}
                    src={item.url}
                  />
                ))}
              </Carousel>
            </div>
            <div className="info">
              <div className="price-range">
                {data.priceRanges && (
                  <React.Fragment>
                    <h3>Price Range:</h3>
                    <h4>
                      {data.priceRanges[0].min}$ - {data.priceRanges[0].max} $
                    </h4>
                  </React.Fragment>
                )}
              </div>

              {data.pleaseNote && (
                <React.Fragment>
                  <h3>Please Note:</h3>
                  <h4>{data.pleaseNote}</h4>
                </React.Fragment>
              )}
              {data.generalInfo.generalRule && (
                <React.Fragment>
                  <h3>Please Note:</h3>
                  <h4>{data.generalInfo.generalRule}</h4>
                </React.Fragment>
              )}
              {data.seatmap && (
                <button>
                  <a href={data.seatmap.staticUrl} target="__blank">
                    Seat Availability
                  </a>
                </button>
              )}
            </div>
          </div>
          {/* <img className="event-img" src={data.images[0].url} /> */}
          <p></p>
        </div>
      )}
    </div>
  );
}
