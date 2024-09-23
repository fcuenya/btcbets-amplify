enum BetStatus {
    READY, WINNER, LOSER, PROCESSING, RESOLVING
}

type Bet = {
    betPrice: number,
    isHigherBet: boolean,
    finalPrice?: number
};

type GameState = {
    btcPrice: number,
    betStatus: BetStatus,
    betProcessingTimeout: number,
    betResolvingTimeout: number,
    userScore: number,
    currentBet?: Bet,
    makeBet: (isHigherBet: boolean) => void,
    resetBet: () => void
};

export { Bet, BetStatus, GameState };