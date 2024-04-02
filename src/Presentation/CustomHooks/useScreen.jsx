import { useState } from "react"

const useScreen = () => {
    const [screen, setScreen] = useState("search");
    const navigate = (location) => {
        switch (location) {
            case "bookmarked":
                setScreen("bookmarked");
                break;
            case "search":
                setScreen("search");
                break;
            default:
                alert("Error in UI has occurred. Passed invalid props for screen.");
        }
    }
    return [
        screen,
        navigate
    ]
}

export default useScreen;