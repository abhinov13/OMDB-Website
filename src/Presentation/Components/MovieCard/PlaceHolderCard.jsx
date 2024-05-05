import "./MovieCard.css";

const PlaceHolder = () => {
  return (
    <div className="MovieCardPlaceholder">
      <div className="Poster">
        <div className="ImagePlaceHolder"></div>

        <div className="likePlaceholder"></div>
      </div>

      <div className="MovieInfoPlaceholder">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default PlaceHolder;
