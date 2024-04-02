import getMovieByTitle from "../Data/MoviesApi";

const GetMovies = async (title, type, year, page) => {

    try {
        if(type === "None") type = null;
        if(year === "None") year = null;
        if(!page || page === 1) page = null;
        
        const res = await getMovieByTitle(title, type, year, page);
        if (!res.data.Search)
            throw new Error("Custom Error: Invalid movies");
        return { movies: res.data.Search, count: res.data.totalResults, error: null };
    }
    catch (err) {
        return { movies: [], count: 0, error: err };
    }

}

export default GetMovies;