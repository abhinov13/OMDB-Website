import "./Navbar.css";

const Filter = (
  navigate,
  year,
  type,
  searchParams,
  setSearchParams,
  setYear,
  setType
) => {
  const startYear = 1970;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => currentYear - index
  );
  return (
    <div className="Filter">
      <img src="./logo.png" alt="logo" />

      <div className="Links">
        <input
          type="text"
          placeholder="Title"
          value={searchParams}
          onChange={(e) => setSearchParams(e)}
        />

        <select
          value={type}
          style={{ textAlign: "center" }}
          onChange={(e) => setType(e)}
        >
          <option value="None">Type</option>
          <option value="Movie">Movie</option>
          <option value="Series">Series</option>
        </select>

        <select
          value={year}
          style={{ textAlign: "center" }}
          onChange={(e) => setYear(e)}
        >
          <option key={"None"} value="None">
            Release Date
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button onClick={() => navigate()}>Bookmarked</button>
      </div>
    </div>
  );
};

const Back = (onBackPress) => {
  return (
    <div className="Filter" style={{ flexDirection: "row" }}>
      <img src="./logo.png" alt="logo" />

      <div className="Links" style={{ width: "fit-content" }}>
        <button onClick={() => onBackPress()}>Back</button>
      </div>
    </div>
  );
};

const Navbar = ({
  mode,
  navigate,
  onBackPress,
  year,
  type,
  searchParams,
  setSearchParams,
  setYear,
  setType,
}) => {
  return (
    <div className="Navbar">
      {mode === "search"
        ? Filter(
            navigate,
            year,
            type,
            searchParams,
            setSearchParams,
            setYear,
            setType
          )
        : Back(onBackPress)}
    </div>
  );
};

export default Navbar;
