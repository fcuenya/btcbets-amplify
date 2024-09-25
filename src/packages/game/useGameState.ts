import { useEffect, useState } from "react";
import { BET_PROCESSING_TIMEOUT, Bet, BetStatus, GameState, } from "./types.d";
import { Nullable } from "../core/util/types.d";
import { useBtcPrice, useServerData } from '../core/data';

const useGameState = (): Nullable<GameState> => {
    const btcPrice = useBtcPrice();

    const [isDataLoading, setIsDataLoading] = useState(true);
    const { fetchUserScore, saveUserScore } = useServerData();

    const [userScore, setUserScore] = useState(0);

    const [currentBet, setCurrentBet] = useState<Bet>();
    const [betStatus, setBetStatus] = useState<BetStatus>(BetStatus.READY);
    const [betProcessingTimeout, setBetProcessingTimeout] = useState<number>(
        BET_PROCESSING_TIMEOUT
    );

    useEffect(() => {
        fetchUserScore().then((score) => { setUserScore(score || 0); }).catch(() => { }).finally(() => { setIsDataLoading(false) });
    }, [fetchUserScore]);

    useEffect(() => {
        switch (betStatus) {
            case BetStatus.READY:
                setBetProcessingTimeout(BET_PROCESSING_TIMEOUT);
                break;
            case BetStatus.PROCESSING: {
                if (betProcessingTimeout > 0)
                    setTimeout(() => { setBetProcessingTimeout(betProcessingTimeout - 1000); }, 1000);
                else
                    if (btcPrice != null && currentBet && currentBet?.betPrice != btcPrice) {
                        const newBetStatus = (btcPrice > currentBet.betPrice && currentBet?.isHigherBet) ||
                            (btcPrice < currentBet.betPrice && !currentBet?.isHigherBet)
                            ? BetStatus.WINNER
                            : BetStatus.LOSER
                        setCurrentBet({ ...currentBet, finalPrice: btcPrice });
                        const newScore = (newBetStatus == BetStatus.WINNER ? (userScore + 1) : (userScore > 0 ? userScore - 1 : 0));
                        setUserScore(newScore);
                        //TODO: surface score saving error
                        saveUserScore(newScore).catch((e) => { console.error(e); });
                        setBetStatus(newBetStatus);
                    }
                // TODO: surface bet resolving error
                break;
            }
            case BetStatus.WINNER:
            case BetStatus.LOSER:
                break;
            default:
        }
    }, [
        btcPrice,
        betStatus,
        betProcessingTimeout,
        currentBet,
    ]);

    const makeBet = (isHigherBet: boolean) => {
        if (btcPrice != null && betStatus == BetStatus.READY) {
            setCurrentBet({ betPrice: btcPrice, isHigherBet });
            setBetStatus(BetStatus.PROCESSING);
        }
    };

    const resetBet = () => {
        setCurrentBet(undefined);
        setBetStatus(BetStatus.READY);
    }

    return isDataLoading ? null : {
        userScore, betStatus, btcPrice, betProcessingTimeout, currentBet, makeBet, resetBet
    }
};

export default useGameState;