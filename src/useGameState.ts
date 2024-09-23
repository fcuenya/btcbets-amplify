import { useEffect, useState, useRef } from "react";
import { Bet, BetStatus, GameState } from "./types.d";
import useBtcPrice from './useBtcPrice';

const BET_PROCESSING_TIMEOUT = 15000;//60000;
const BET_RESOLVING_TIMEOUT = 10000;

const useGameState = (): GameState => {
    const btcPrice = useBtcPrice();

    //TODO: load user score
    const [userScore, setUserScore] = useState(0);

    const [currentBet, setCurrentBet] = useState<Bet>();
    const [betStatus, setBetStatus] = useState<BetStatus>(BetStatus.READY);
    const [betProcessingTimeout, setBetProcessingTimeout] = useState<number>(
        BET_PROCESSING_TIMEOUT
    );
    const processingIntervalRef = useRef<NodeJS.Timeout>();
    const [betResolvingTimeout, setBetResolvingTimeout] = useState<number>(
        BET_RESOLVING_TIMEOUT
    );
    const resolvingIntervalRef = useRef<NodeJS.Timeout>();

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
                    if (currentBet && currentBet?.betPrice != btcPrice) {
                        const newBetStatus = (btcPrice > currentBet.betPrice && currentBet?.isHigherBet) ||
                            (btcPrice < currentBet.betPrice && !currentBet?.isHigherBet)
                            ? BetStatus.WINNER
                            : BetStatus.LOSER
                        setCurrentBet({ ...currentBet, finalPrice: btcPrice });
                        setUserScore((userScore) => (newBetStatus == BetStatus.WINNER ? (userScore + 1) : (userScore > 0 ? userScore - 1 : 0)));
                        //TODO: save score to backend                
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

    return {
        userScore, betStatus, btcPrice, betProcessingTimeout, betResolvingTimeout, currentBet, makeBet, resetBet
    }
};

export default useGameState;