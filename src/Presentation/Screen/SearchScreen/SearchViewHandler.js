import { useCallback, useEffect, useState, useMemo, useRef } from "react"
import GetMovies from "../../../Domain/GetMovies";

const SearchViewHandler = (params) => {

    const [searchParams, setSearchParams] = useState("");
    const [type, setType] = useState("None");
    const [year, setYear] = useState("None");
    const [page, setPage] = useState();
    const [loading, setLoading] = useState(false);

    const prevPage = useRef();

    const processedParam = useMemo(() => {
        let param = searchParams;
        param = param.trim();
        param = param.replace(/\s+/g, ' ');
        param = param.replace(/ /g, '+');
        return param;
    }, [searchParams]);


    const [movies, setMovies] = useState([]);
    const [resultCount, setResultCount] = useState(0);

    const updateSearchString = useCallback(
        (e) => {
            setSearchParams(e.target.value);
        }, []
    )

    const updateType = useCallback(
        (e) => {
            setType(e.target.value);
        }, []
    )

    const updateYear = useCallback(
        (e) => {
            setYear(e.target.value);
        }, []
    )

    useEffect(() => {
        if (params.current) {
            setType(params.current.type);
            setSearchParams(params.current.searchParams);
            setYear(params.current.year);
            setPage(params.current.page);
        }
    }, [params]);

    useEffect(
        () => {
            let ignored = false;
            async function get() {
                let p = page;

                if (p === prevPage.current) p = 1;
                const { movies, count, error } = await GetMovies(processedParam, type, year, p);
                if (!error && movies && !ignored) {
                    setMovies(movies);
                    setResultCount(count);
                    prevPage.current = page;
                    setPage(p);
                    params.current = {
                        type,
                        searchParams: processedParam.replace(/\+/g, ' '),
                        year,
                        page
                    };
                }
                setLoading(false);
            }

            let timeOut;
            if (processedParam) {
                setLoading(true);
                timeOut = setTimeout(() => { get() }, 300);
            }

            return () => {
                if (timeOut) clearTimeout(timeOut);
                ignored = true;
                setLoading(false);
            }
        },
        [processedParam, type, year, page, params]
    );

    return {
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
    }
}

export default SearchViewHandler;