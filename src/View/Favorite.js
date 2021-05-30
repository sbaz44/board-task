import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Card from "../components/Card";
import VenueCard from "../components/VenueCard";

export default function Favorite() {
  const [activeTab, setActiveTab] = useState(() => "Events");

  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("event_favorites"))
  );
  const [venue, setVenue] = useState(
    JSON.parse(localStorage.getItem("venue_favorites"))
  );

  const setEventData = (data) => {
    setEvents(JSON.parse(localStorage.getItem("event_favorites")));
  };
  const setVenueData = (data) => {
    setVenue(JSON.parse(localStorage.getItem("venue_favorites")));
  };
  const Events = () => {
    if (events.length === 0) {
      return (
        <div className="noData">
          <p>NO EVENT FOUND</p>
        </div>
      );
    }
    return events.map((item) => (
      <Card
        key={item.id}
        id={item.id}
        image={item.image}
        date={item.date}
        name={item.name}
        time={item.time}
        passChildData={setEventData}
      />
    ));
  };

  const Venues = () => {
    if (venue.length === 0) {
      return (
        <div className="noData">
          <p>NO VENUE FOUND</p>
        </div>
      );
    }
    return venue.map((item) => (
      <VenueCard
        key={item.id}
        id={item.id}
        image={item.images && item.images}
        name={item.name}
        city={item.city && item.city.name}
        state={item.state && item.state.name}
        passChildData={setVenueData}
      />
    ));
  };

  return (
    <div className="favorite-wrapper">
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
      <div className="tabs">
        <button
          className={activeTab === "Events" ? "active-tab" : ""}
          onClick={() => {
            setActiveTab("Events");
          }}
        >
          Event
        </button>
        <button
          className={activeTab === "Venues" ? "active-tab" : ""}
          onClick={() => {
            setActiveTab("Venues");
          }}
        >
          Venue
        </button>
      </div>
      <div className="data-wrapper">
        {activeTab === "Events" ? Events() : Venues()}
      </div>
    </div>
  );
}
