import { useEffect, useRef } from "react";

const useObserver = (callback: () => void) => {
    const observer = useRef<IntersectionObserver | null>(null);

    const observe = (e: HTMLDivElement) => {
        observer.current && observer.current.observe(e);
    };

    const unobserve = (e: HTMLDivElement) => {
        observer.current && observer.current.unobserve(e);
    };
    useEffect(() => {
        observer.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting && callback();
            });
        });
    }, []);

    return [observe, unobserve];
};

export default useObserver;
