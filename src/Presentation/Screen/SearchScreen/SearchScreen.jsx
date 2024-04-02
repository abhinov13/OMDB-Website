import MovieCard from "../../Components/MovieCard/MovieCard";
import PlaceHolder from "../../Components/MovieCard/PlaceHolderCard";
import Navbar from "../../Components/Navbar/Navbar";
import PagePicker from "../../Components/PagePicker/PagePicker";
import SearchViewHandler from "./SearchViewHandler";

const SearchScreen = ({ navigate, params }) => {

    const {
        updateSearchString,
        updateType,
        updateYear,
        year,
        type,
        searchParams,
        movies,
        resultCount,
        page,
        setPage,
        loading
    } = SearchViewHandler(params);

    return <>
        <Navbar mode="search"
            navigate={() => navigate("bookmarked")}
            setSearchParams={updateSearchString}
            setType={updateType}
            setYear={updateYear}
            year={year}
            type={type}
            searchParams={searchParams}
        />
        <div className="MovieContainer">
            {
                movies.map((movie) => (
                    loading ?
                        <PlaceHolder key={movie.imdbID} />
                        : <MovieCard key={movie.imdbID} imdbID={movie.imdbID} poster={movie.Poster} title={movie.Title} year={movie.Year} />
                ))
            }
        </div>

        {page ? <PagePicker currentPage={page} lastPage={Math.trunc(resultCount / 10) + 1} setPage={setPage} /> : ""}
    </>
};

export default SearchScreen;