import { useBookmarks } from "../../Context/Bookmarked";
import NotFound from "../NotFound/NotFound";
import "./MovieCard.css";

const MovieCard = ({ poster, year, title, imdbID }) => {

    const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
    const saved = (bookmarks.filter((movie) => movie.imdbID === imdbID).length > 0);

    return <div className="MovieCard">
        <div className="Poster">
            {
                poster && poster !== "N/A" ?
                    <img
                        src={poster}
                        alt={title}
                    />
                    : <NotFound />
            }

            <div
                className={`like${saved ? " saved" : ""}`}
                onClick={!saved ? () => addBookmark({ Poster: poster, Year: year, Title: title, imdbID })
                    : () => removeBookmark(imdbID)}
            >
                <div>
                    {saved ? "Saved" : "Save"}
                </div>
                <div className="SaveImg">
                    <img
                        src="./star_empty.svg"
                        alt="Save"
                    />
                </div>
            </div>

        </div>

        <div className="MovieInfo">
            {title}<br />
            <span>{year}</span>
        </div>

    </div>
}

export default MovieCard;