import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // Initialize error state with null

    const activeHttpRequests = useRef([]);

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true);
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });

            const responseData=await response.json();//returns a new promise

            activeHttpRequests.current=activeHttpRequests.current.filter(
                reqCtrl=>reqCtrl!==httpAbortCtrl
            );

            if(!response.ok){//i.e a 400 or 500 error
                throw new Error(responseData.message);
            }
            //if the above if check is passed we return response data 
             setIsLoading(false);
            return responseData;
        }catch(err){
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    },[]);

    const clearError=()=>{
        setError(null);
    };

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};