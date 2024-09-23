import { BetStatus, Bet } from "./types.d";

type BetScoreProps = {
  betStatus: BetStatus;
  userScore: number;
  currentBet?: Bet;
  betProcessingTimeout: number;
  betResolvingTimeout: number;
};

const BetScore = ({
  betStatus,
  userScore,
  currentBet,
  betProcessingTimeout,
  betResolvingTimeout,
}: BetScoreProps) => {
  const isBetResolved =
    betStatus == BetStatus.WINNER || betStatus == BetStatus.LOSER;

  return (
    <div>
      <div>Total Score: {userScore} points</div>
    </div>
  );
};

export default BetScore;
