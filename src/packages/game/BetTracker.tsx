import { Bet, BetStatus } from "./types.d";

import BtcPrice from "./BtcPrice";

type BetTrackerProps = {
  btcPrice: number;
  betStatus: BetStatus;
  betProcessingTimeout: number;
  userScore: number;
  currentBet?: Bet;
};

const BetTracker = ({
  btcPrice,
  betStatus,
  betProcessingTimeout,
  userScore,
  currentBet,
}: BetTrackerProps) => {
  let statusTitle = "";
  let textColor = "";
  switch (betStatus) {
    case BetStatus.PROCESSING:
      statusTitle = "In progress...";
      break;
    case BetStatus.WINNER:
      statusTitle = "Congrats, you've got it!";
      textColor = "text-success";
      break;
    case BetStatus.LOSER:
      statusTitle = "Wrong guess, try again!";
      textColor = "text-error";
      break;
    default:
      statusTitle = "Guess the next Bitcoin price!";
  }
  return (
    <div className="flex flex-col place-content-center">
      <div className="flex flex-row place-content-center m-10">
        <BtcPrice
          btcPrice={btcPrice}
          currentBet={currentBet}
          betStatus={betStatus}
          betProcessingTimeout={betProcessingTimeout}
        />
      </div>
      <div className="flex flex-row place-content-center mb-10">
        <div>
          <strong className="text-lg mr-2">Your Score:</strong>
          <span className="font-mono">{userScore} points</span>
        </div>
      </div>
    </div>
  );
};

export default BetTracker;
