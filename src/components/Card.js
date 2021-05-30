import React, { useEffect, useState } from "react";
import calendar from "../assets/image/calendar.png";
import favorite from "../assets/image/favorite.png";
import { useDispatch, useSelector } from "react-redux";

export default function Card({ image, date, name, time, id }) {
  const dispatch = useDispatch();
  const event_favorites = useSelector((state) => state.event_favorites);
  const [myDate, setMyDate] = useState({});
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem("event_favorites"))
  );
  const getDate = (datee, timee) => {
    if (timee === undefined) timee = "00:00:00";
    let datetime = datee + " " + timee;
    var myDate = new Date(datetime);

    let daysList = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let monthsList = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Aug",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = myDate.getDate();
    let month = monthsList[myDate.getMonth()];
    let year = myDate.getFullYear();
    let day = daysList[myDate.getDay()];

    // let today = `${date} ${month} ${year}, ${day}`;

    let amOrPm;
    let twelveHours = function () {
      if (myDate.getHours() >= 12) {
        amOrPm = "PM";
        let twentyFourHourTime = myDate.getHours();
        let conversion = twentyFourHourTime - 12;
        if (conversion === 0) conversion = 12;
        return `${conversion}`;
      } else {
        amOrPm = "AM";
        return `${myDate.getHours()}`;
      }
    };
    let hours = twelveHours();
    let minutes = myDate.getMinutes();
    let seconds = myDate.getSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours < 10) {
      hours = "0" + hours;
    }

    // let currentTime = `${hours}:${minutes}:${seconds} ${amOrPm}`;

    let time = {
      date: date,
      month: month,
      year: year,
      day: day,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      amOrPm: amOrPm,
    };
    setMyDate(time);
  };

  const isPresent = (id) => {
    if (events === null) return;
    console.log(id);
    console.log(events);
    let existed_item = events.find((item) => id === item.id);
    if (existed_item) return true;
    return false;
  };
  useEffect(() => {
    if (date) getDate(date, time);
  }, []);

  return (
    <div className="card">
      {console.log(events)}
      <img
        src={favorite}
        alt="Event image"
        className={isPresent(id) ? "active-favorite" : "favorite"}
        onClick={() => {
          let obj = {
            image: image,
            date: date,
            name: name,
            time: time,
            id: id,
          };
          dispatch({
            type: "ADD_EVENT_FAVORITE",
            value: obj,
          });
          setEvents(JSON.parse(localStorage.getItem("event_favorites")));
        }}
      />
      <img src={image} alt="Event" className="card-image" />
      <div className="event-date">
        {myDate.date}
        <br />
        {myDate.month}
      </div>
      <p className="name">{name}</p>
      <div className="time">
        <img src={calendar} alt="calendar" className="calendar" />
        {myDate.hours}:{myDate.minutes} {myDate.amOrPm}
      </div>
    </div>
  );
}
