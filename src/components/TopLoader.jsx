import React, { useEffect } from 'react';
import NextTopLoader from 'nextjs-toploader';
import { useLocation } from 'react-router-dom';


const TopLoader = () => {
    const location = useLocation();

    useEffect(() => {
        // Loading active when URL change
    }, [location]);

    return (
        <NextTopLoader
            color="linear-gradient(to right, rgb(0,0,255), rgb(216, 180, 254), rgb(0,191,255))"
            height={4}
            easing="ease"
            speed={2000}
        />
    );
};

export default TopLoader;
