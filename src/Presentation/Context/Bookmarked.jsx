import { createContext, useContext, useEffect, useState } from "react";

const bookmarkKey = "Bookmarks";

const BookmarkedContext = createContext();

const BookmarkedProvider = ({ children }) => {

    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        if (localStorage.getItem(bookmarkKey)) {
            setBookmarks(JSON.parse(localStorage.getItem(bookmarkKey)))
        }
    }, []);

    function removeBookmark(imdbId) {
        const updatedBookmarks = bookmarks.filter((movie) => (movie.imdbID !== imdbId));
        localStorage.setItem(bookmarkKey, JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
    }

    function addBookmark(movie) {
        const updatedBookmarks = [...bookmarks, movie];
        localStorage.setItem(bookmarkKey, JSON.stringify(updatedBookmarks));
        setBookmarks(updatedBookmarks);
    }

    return <BookmarkedContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
        {children}
    </BookmarkedContext.Provider>
}

export const useBookmarks = () => {
    return useContext(BookmarkedContext);
};

export default BookmarkedProvider;
