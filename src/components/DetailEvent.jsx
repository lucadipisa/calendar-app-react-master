import ReactDOM from "react-dom";
import "./DetailEvent.css";
import axios from "axios";

const DetailEvent = ({ setShowEvent, day }) => {
  const handleDeleteEvent = (e) => {
    e.preventDefault();
    axios.delete(`http://localhost:3002/events/${day.event.id}`);
  };
  return ReactDOM.createPortal(
    <div className="show-event rounded p-4 bg-event text-dark text-dark shadow-lg">
      <div className="w-100 d-flex flex-column">
        <div>
          <h3 className="text-center w-100 h-auto">
            {day.event.title.toUpperCase()}
          </h3>
          <div className="text-bloc">
            <p className="text-sm">Votre rendez-vous est à {day.event.time}</p>
            <p className="text-sm">Description : {day.event.text}</p>
          </div>
        </div>

        <div className="d-flex justify-content-between w-100 mt-auto">
          <button className="btn btn-outline-dark" onClick={() => setShowEvent(false)}>
            Fermer
          </button>
          <button onClick={handleDeleteEvent} className="btn btn-danger">
            Supprimer
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("showEvent")
  );
};

export default DetailEvent;
