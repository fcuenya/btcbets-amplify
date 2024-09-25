const BET_PROCESSING_TIMEOUT = 60000;

enum BetStatus {
    READY, WINNER, LOSER, PROCESSING
}

type Bet = {
    betPrice: number,
    isHigherBet: boolean,
    finalPrice?: number
};

type GameState = {
    btcPrice: Nullable<number>,
    betStatus: BetStatus,
    betProcessingTimeout: number,
    userScore: number,
    currentBet?: Bet,
    makeBet: (isHigherBet: boolean) => void,
    resetBet: () => void
};

export { BET_PROCESSING_TIMEOUT, Bet, BetStatus, GameState };