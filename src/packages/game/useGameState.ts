import { useEffect, useState } from "react";
import { Bet, BetStatus, GameState, } from "./types.d";
import { Nullable } from "../core/util/types.d";
import { useBtcPrice, useServerData } from '../core/data';

const BET_PROCESSING_TIMEOUT = 15000;//60000;
const BET_RESOLVING_TIMEOUT = 10000;

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
    const [betResolvingTimeout, setBetResolvingTimeout] = useState<number>(
        BET_RESOLVING_TIMEOUT
    );

    useEffect(() => {
        fetchUserScore().then((score) => { setUserScore(score || 0); }).catch(() => { }).finally(() => { setIsDataLoading(false) });
    }, [fetchUserScore]);

    useEffect(() => {
        // TODO: could use a reducer instead?
        switch (betStatus) {
            case BetStatus.READY:
                setBetProcessingTimeout(BET_PROCESSING_TIMEOUT);
                setBetResolvingTimeout(BET_RESOLVING_TIMEOUT);
                break;
            case BetStatus.PROCESSING: {
                if (betProcessingTimeout > 0)
                    setTimeout(() => { setBetProcessingTimeout(betProcessingTimeout - 1000); }, 1000);
                else
                    setBetStatus(BetStatus.RESOLVING);
                break;
            }
            case BetStatus.RESOLVING: {
                // start the bet resolving timeout
                if (betResolvingTimeout > 0) {
                    // try to resolve the bet
                    if (btcPrice != null && currentBet && currentBet?.betPrice != btcPrice) {
                        const newBetStatus = (btcPrice > currentBet.betPrice && currentBet?.isHigherBet) ||
                            (btcPrice < currentBet.betPrice && !currentBet?.isHigherBet)
                            ? BetStatus.WINNER
                            : BetStatus.LOSER
                        setCurrentBet({ ...currentBet, finalPrice: btcPrice });
                        const newScore = (newBetStatus == BetStatus.WINNER ? (userScore + 1) : (userScore > 0 ? userScore - 1 : 0));
                        setUserScore(newScore);
                        //TODO: handle score saving error
                        saveUserScore(newScore).catch((e) => { console.error(e); });
                        setBetStatus(newBetStatus);
                    }
                    setTimeout(() => { setBetResolvingTimeout(betResolvingTimeout - 1000); }, 1000);
                }
                else {
                    // TODO: handle bet resolving error
                    setBetStatus(BetStatus.READY);
                }
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
        betResolvingTimeout,
        currentBet,
    ]);

    const makeBet = (isHigherBet: boolean) => {
        if (betStatus == BetStatus.READY) {
            setCurrentBet({ betPrice: btcPrice, isHigherBet });
            setBetStatus(BetStatus.PROCESSING);
        }
        //TODO: handle blocking bets?
        else {
        }
    };

    const resetBet = () => {
        setCurrentBet(undefined);
        setBetStatus(BetStatus.READY);
    }

    return isDataLoading ? null : {
        userScore, betStatus, btcPrice, betProcessingTimeout, betResolvingTimeout, currentBet, makeBet, resetBet
    }
};

export default useGameState;