import {useEffect, useState} from "react";

export default function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [windowWidth]);

    return windowWidth;
}

export const LG_SCREEN_WIDTH_PX = 992;