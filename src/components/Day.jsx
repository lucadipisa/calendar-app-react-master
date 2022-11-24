import "./Day.css";
import { useState } from "react";
import DetailEvent from "./DetailEvent";

const Day = ({ day }) => {
  const [showEvent, setShowEvent] = useState(false);
  const className = `day ${!day.isDayInMonth ? "padding" : ""} ${
    day.isToday ? "currentDay" : ""
  }`;

  return (
    <>
      <div className={className} onClick={() => setShowEvent(true)}>
        {day.value}
        {day.event && (
          <div className="event">
            {day.event.title} à {day.event.time}
          </div>
        )}
      </div>

      {showEvent  && <DetailEvent setShowEvent={setShowEvent} day={day} />}
    </>    
  );
};

export default Day;
