import { useState, useEffect } from "react";

const useBtcPrice = (): number => {
    const [btcPrice, setBtcPrice] = useState<number>(0);
    useEffect(() => {
        const interval = setInterval(() => setBtcPrice(Number((Math.random() * 10000).toFixed(2))), 3000);
        return () => { clearInterval(interval) }
    }, []);
    return btcPrice;
};

export default useBtcPrice;