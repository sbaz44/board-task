import React from "react";

export default function VenueCard({ image, city, name, state }) {
  return (
    <div className="card">
      <img src={image} alt="Event" className="card-image" />

      <p className="name">{name}</p>
      <p className="name">
        {city}, {" " + state}
      </p>
    </div>
  );
}
