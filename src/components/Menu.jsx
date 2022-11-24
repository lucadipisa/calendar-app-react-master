import "./Menu.css";
const Menu = ({
  setCurrentMonthPosition,
  currentMonthPosition,
  theDay,
  theMonth,
  theYear,
  setCurrentYearPosition,
  currentYearPosition,
  isOpenModal,
  setIsOpenModal,
}) => {
  return (
    <div className="menu d-flex justify-content-between">
      <div className="d-flex">
        <div className="d-flex">
          <button
            id = "ni"
            className="btn btn-month mx-1"
            onClick={() => setCurrentMonthPosition(currentMonthPosition - 1)}
          >
            &#60;
          </button>
          <h3>{theMonth.toUpperCase()}</h3>
          <button
            className="btn btn-month mx-1"
            onClick={() => setCurrentMonthPosition(currentMonthPosition + 1)}
          >
            &#62;
          </button>
        </div>
        <div className="d-flex">
          <button
            className="btn btn-month mx-1"
            onClick={() => setCurrentYearPosition(currentYearPosition - 1)}
          >
            &#60;
          </button>
          <h3>{theYear}</h3>
          <button
            className="btn btn-month mx-1"
            onClick={() => setCurrentYearPosition(currentYearPosition + 1)}
          >
            &#62;
          </button>
        </div>
      </div>
      <div>
        <p className="current-date">
          Aujourd'hui: {theDay}&nbsp;{theMonth}&nbsp;{theYear}
        </p>
      </div>
      <div>
        <button className="btn-info btn mx-1" onClick={() => setIsOpenModal(!isOpenModal)}>
          Ajouter un RDV
        </button>
      </div>
    </div>
  );
};

export default Menu;
