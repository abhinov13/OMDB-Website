import { useCallback, useEffect, useState, useMemo, useRef } from "react";
import GetMovies from "../../../Domain/GetMovies";

const SearchViewHandler = (params) => {
  const [searchParams, setSearchParams] = useState("");
  const [type, setType] = useState("None");
  const [year, setYear] = useState("None");
  const [page, setPage] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setError] = useState("");
  let placeholder = useMemo(() => {
    let p = [];
    for (let i = 0; i < 10; i++) {
      p.push(i);
    }
    return p;
  }, []);

  const prevPage = useRef();

  const processedParam = useMemo(() => {
    let param = searchParams;
    param = param.trim();
    param = param.replace(/\s+/g, " ");
    param = param.replace(/ /g, "+");
    return param;
  }, [searchParams]);

  const [movies, setMovies] = useState([]);
  const [resultCount, setResultCount] = useState(0);

  const updateSearchString = useCallback((e) => {
    setSearchParams(e.target.value);
  }, []);

  const updateType = useCallback((e) => {
    setType(e.target.value);
  }, []);

  const updateYear = useCallback((e) => {
    setYear(e.target.value);
  }, []);

  useEffect(() => {
    if (params.current) {
      setType(params.current.type);
      setSearchParams(params.current.searchParams);
      setYear(params.current.year);
      setPage(params.current.page);
    }
  }, [params]); //function to memoize inserted parameters

  useEffect(() => {
    let ignored = false;
    async function get() {
      let p = page;

      if (p === prevPage.current) p = 1;
      let movies, count, error;
      if (processedParam.length === 0) {
        ({ movies, count, error } = {
          movies: null,
          count: null,
          error: new Error("Please enter some keywords to search"),
        });
      } else {
        ({ movies, count, error } = await GetMovies(
          processedParam,
          type,
          year,
          p
        ));
      }
      if (!error && movies && !ignored) {
        setMovies(movies);
        setResultCount(count);
        prevPage.current = page;
        setPage(p);
        setError("");
        params.current = {
          type,
          searchParams: processedParam.replace(/\+/g, " "),
          year,
          page,
        };
      } else if (!ignored && error) {
        if (error.message === "Too many results.") {
          setError(
            "Too many results. Please specify more filters or keywords to search."
          );
        } else setError(error.message);
      }
      setLoading(false);
    }

    let timeOut;
    setLoading(true);
    timeOut = setTimeout(() => {
      get();
    }, 300);

    return () => {
      if (timeOut) clearTimeout(timeOut);
      ignored = true;
      setLoading(false);
    };
  }, [processedParam, type, year, page, params]);

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
    loading,
    placeholder,
    errorMsg,
  };
};

export default SearchViewHandler;
