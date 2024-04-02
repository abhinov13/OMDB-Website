import { useRef } from "react"

const useSearchParams = () => {

    const params = useRef();

    return {
        params
    }
}

export default useSearchParams;