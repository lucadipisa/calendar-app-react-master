import "./App.css";
import { useState, useEffect } from "react";
import Day from "./components/Day";
import Menu from "./components/Menu";
// import Sidebar from "./components/Sidebar";
import NewEventModal from "./components/NewEventModal";
import axios from "axios";


const App = () => {
  const [currentMonthPosition, setCurrentMonthPosition] = useState(0);
  const [currentYearPosition, setCurrentYearPosition] = useState(0);

  const [days, setDays] = useState([]);
  const [events, setEvents] = useState([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [theDay, setTheDay] = useState("");
  const [theMonth, setTheMonth] = useState("");
  const [theYear, setTheYear] = useState("");


  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("http://localhost:3002/events");
      const data = res.data;
      data.map((element) => {
        return setEvents((preEvent) => [
          ...preEvent,
          {
            id: element.id,
            title: element.title,
            text: element.description.text,
            time: element.description.time,
            day: parseInt(element.date.split("-")[2]),
            month: parseInt(element.date.split("-")[1]),
            year: parseInt(element.date.split("-")[0]),
          },
        ]);
      });
    };
    fetchEvents();
  }, []);
  
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const weekdays = [
      "dimanche",
      "lundi",
      "mardi",
      "mercredi",
      "jeudi",
      "vendredi",
      "samedi",
    ];

    const dt = new Date();

    if (currentMonthPosition !== 0) {
      dt.setMonth(new Date().getMonth() + currentMonthPosition);
    }

    if (currentYearPosition !== 0) {
      dt.setYear(new Date().getFullYear() + currentYearPosition);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const dateInfo = firstDayOfMonth.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    setTheDay(dt.toLocaleDateString("fr-Fr", { day: "numeric" }));
    setTheMonth(dt.toLocaleDateString("fr-FR", { month: "long" }));
    setTheYear(dt.toLocaleDateString("fr-FR", { year: "numeric" }));

    const dayRemainsFromLastMonth = weekdays.indexOf(dateInfo.split(" ")[0]);
    const dayArray = [];
    const daysInMonth = getDaysInMonth(month, year);
    const currentDays = dayRemainsFromLastMonth + daysInMonth;
    const totalRow = Math.ceil(currentDays / 7);
    const daysToCompleteCalendar = 7 * totalRow - currentDays;
    const totalDays = currentDays + daysToCompleteCalendar;

    const dateEvent = (date) => {
      return events.find(
        (event) => date === `${event.year}-${event.month}-${event.day}`
      );
    };

    for (let i = 1; i <= totalDays; i++) {
      if (
        i > dayRemainsFromLastMonth &&
        i <= totalDays - daysToCompleteCalendar
      ) {
        const dayString = `${year}-${month + 1}-${i - dayRemainsFromLastMonth}`;
        const today =
          i - dayRemainsFromLastMonth === day &&
          currentMonthPosition === 0 &&
          currentYearPosition === 0;
        dayArray.push({
          value: i - dayRemainsFromLastMonth,
          event: dateEvent(dayString),
          isToday: today,
          dayInfo: "",
          isDayInMonth: true,
        });
      } else if (i > totalDays - daysToCompleteCalendar) {
        dayArray.push({
          value: i - (totalDays - daysToCompleteCalendar),
          event: null,
          isToday: false,
          dayInfo: "",
          isDayInMonth: false,
        });
      } else {
        dayArray.unshift({
          value: getDaysInMonth(month - 1, year) - i + 1,
          event: null,
          isToday: false,
          dayInfo: "",
          isDayInMonth: false,
        });
      }
    }
    setDays(dayArray);
  }, [currentMonthPosition, currentYearPosition, events]);

  return (
    <>
    {/* <Sidebar /> */}
      <div className="App bg-light align-middle">
        <div className="mid-content">
          <h1 className="text-center my-3 text-uppercase">Calendrier</h1>
          <h2 className="text-center my-3">DI PISA Luca</h2>  
          <div className="d-flex justify-content-center">
          <div className="d-flex navigation justify-content-between text-center">
          <Menu
                setCurrentMonthPosition={setCurrentMonthPosition}
                currentMonthPosition={currentMonthPosition}
                theDay={theDay}
                theMonth={theMonth}
                theYear={theYear}
                setCurrentYearPosition={setCurrentYearPosition}
                currentYearPosition={currentYearPosition}
                setIsOpenModal={setIsOpenModal}
                isOpenModal={isOpenModal}
              />
            </div>
          </div>
          {isOpenModal && <NewEventModal setIsOpenModal={setIsOpenModal} />}

          <div className="d-flex weekday text-center bg-red text-light">
            <div>Dimanche</div>
            <div>Lundi</div>
            <div>Mardi</div>
            <div>Mercredi</div>
            <div>Jeudi</div>
            <div>Vendredi</div>
            <div>Samedi</div>
          </div>

          <div className="calendar">
          {days.map((day, index) => {
              return <Day key={index} day={day} />;
            })}
          </div>
          </div>
      </div>
      
    </>
  );
};

export default App;
