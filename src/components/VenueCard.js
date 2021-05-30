import React, { useState } from "react";
import { useDispatch } from "react-redux";
import favorite from "../assets/image/favorite.png";
import { useHistory } from "react-router-dom";
import noimage from "../assets/image/noimage.png";
export default function VenueCard({
  image,
  city,
  name,
  state,
  id,
  passChildData,
}) {
  let history = useHistory();
  const dispatch = useDispatch();
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("venue_favorites"))
  );
  const isPresent = (id) => {
    if (events === null) return;

    let existed_item = events.find((item) => id === item.id);
    if (existed_item) return true;
    return false;
  };
  return (
    <div className="card">
      <img
        src={favorite}
        alt="Event image"
        className={isPresent(id) ? "active-favorite" : "favorite"}
        onClick={() => {
          let obj = {
            image: image,
            city: city,
            name: name,
            state: state,
            id: id,
          };
          dispatch({
            type: "ADD_VENUE_FAVORITE",
            value: obj,
          });
          setEvents(JSON.parse(localStorage.getItem("venue_favorites")));
          if (passChildData) passChildData(true);
        }}
      />
      <img
        src={image ? image : noimage}
        alt="Event"
        className="card-image"
        onClick={() => history.push("/venues/" + id)}
      />

      <p className="name">{name}</p>
      <p className="name">
        {city} {state ? ", " + state : ""}
      </p>
    </div>
  );
}
