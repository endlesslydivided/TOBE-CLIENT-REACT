//@ts-nocheck
import {useEffect, useRef} from "react";

export const useObserver = (ref, page,totalPages, isLoading, callback) => 
{
    const observer = useRef();

    useEffect(() => 
    {
        if(isLoading) 
            return;
        if(observer.current) 
            observer.current.disconnect();

        var cb = function(entries, observer) 
        {
            if (entries[0].isIntersecting && page <= totalPages) 
            {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
    }, [isLoading])
}