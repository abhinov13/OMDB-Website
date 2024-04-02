import Navbar from "../../Components/Navbar/Navbar";
import { useBookmarks } from "../../Context/Bookmarked";
import MovieCard from "../../Components/MovieCard/MovieCard";

const BookmarkedScreen = ({ navigate }) => {

    const { bookmarks } = useBookmarks();

    return <>
        <Navbar mode="bookmarked" onBackPress={() => navigate("search")} />
        <div className="MovieContainer">
            {bookmarks.map(
                (movie) => (
                    <MovieCard key={movie.imdbID} imdbID={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year} />
                )
            )}
        </div>
    </>
};

export default BookmarkedScreen;