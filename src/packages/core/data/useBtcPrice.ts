import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import { Nullable } from '../util/types.d';

const COINBASE_WS_URL = 'wss://ws-feed.exchange.coinbase.com';

const COINBASE_WS_SUBSCRIBE_MSG = {
    "type": "subscribe",
    "product_ids": ["BTC-USD"],
    "channels": ["ticker"]
};

const COINBASE_WS_UNSUBSCRIBE_MSG = {
    "type": "unsubscribe",
    "channels": ["heartbeat"]
};

const useBtcPrice = (): Nullable<number> => {
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(COINBASE_WS_URL, { share: true, onOpen: () => { sendJsonMessage(COINBASE_WS_SUBSCRIBE_MSG); } });
    useEffect(() => {
        return () => {
            sendJsonMessage(COINBASE_WS_UNSUBSCRIBE_MSG);
        };
    }, []);
    return lastJsonMessage?.price;
};

export default useBtcPrice;