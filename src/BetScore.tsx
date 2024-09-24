import { BetStatus, Bet } from "./types.d";

type BetScoreProps = {
  betStatus: BetStatus;
  userScore: number;
  currentBet?: Bet;
  betProcessingTimeout: number;
  betResolvingTimeout: number;
};

const BetScore = ({
  // betStatus,
  userScore,
}: // currentBet,
// betProcessingTimeout,
// betResolvingTimeout,
BetScoreProps) => {
  // const isBetResolved =
  //   betStatus == BetStatus.WINNER || betStatus == BetStatus.LOSER;

  return (
    <div>
      <strong className="text-lg mr-2">Total Score:</strong>
      <span className="font-mono">{userScore} points</span>
    </div>
  );
};

export default BetScore;
