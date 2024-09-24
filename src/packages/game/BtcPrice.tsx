import { Bet, BetStatus } from "./types.d";

type BtcProps = {
  btcPrice?: number;
  currentBet?: Bet;
  betProcessingTimeout: number;
  betStatus: BetStatus;
};

const formatPrice = (price?: number) =>
  price
    ? new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "USD",
      }).format(price)
    : "--";

const getTextColor = (betStatus: BetStatus) => {
  switch (betStatus) {
    case BetStatus.WINNER:
      return "text-success";
    case BetStatus.LOSER:
      return "text-error";
    case BetStatus.READY:
    default:
      return "text-neutral-content";
  }
};

const getProgressColor = (betStatus: BetStatus) => {
  switch (betStatus) {
    case BetStatus.PROCESSING:
    case BetStatus.RESOLVING:
      return "text-indigo-400";
    case BetStatus.WINNER:
      return "text-success";
    case BetStatus.LOSER:
      return "text-error";
    case BetStatus.READY:
    default:
      return "text-transparent";
  }
};

const BtcPrice = ({
  btcPrice,
  currentBet,
  betProcessingTimeout,
  betStatus,
}: BtcProps) => {
  //FIXME: parameterize this based off useGameState.BET_PROCESSING_TIMEOUT
  const percentComplete = 100 - betProcessingTimeout / 150;
  //TODO: do the rounding here
  const formattedBetPrice = formatPrice(currentBet?.betPrice);
  // const garbledPrice = useGarbledPrice();
  const activePrice = formatPrice(currentBet?.finalPrice || btcPrice);

  const textColor = getTextColor(betStatus);
  const progressColor = getProgressColor(betStatus);

  const isProcessingBet =
    betStatus == BetStatus.PROCESSING || betStatus == BetStatus.RESOLVING;

  return (
    <div className="flex flex-row place-content-around">
      <div
        className={`radial-progress outline-2 outline-dotted outline-offset-4 ${
          isProcessingBet ? "outline-neutral" : ""
        } flex ${progressColor} border-neutral border-2 z-10 bg-neutral`}
        style={
          {
            "--value": percentComplete,
            "--size": "16rem",
            "--thickness": "3px",
          } as React.CSSProperties
        }
        role="progressbar"
      >
        <div className="text-neutral-content text-center text-lg flex flex-row grow w-full">
          <div
            className={`flex flex-col grow items-center justify-center ${
              currentBet ? "gap-y-5" : ""
            }`}
          >
            <div className="price flex flex-col">
              <div className={`font-bold mb-0.5 ${textColor}`}>
                Current price
              </div>
              <div
                className={`font-mono text-lg ${
                  isProcessingBet ? "blur-sm" : ""
                } ${
                  isProcessingBet || betStatus == BetStatus.READY
                    ? "animate-pulse"
                    : ""
                }`}
              >
                {activePrice}
              </div>
            </div>
            {currentBet ? <hr className="flex w-3/4 opacity-50" /> : null}
            <div className="bet flex flex-col">
              {currentBet ? (
                <div className="text-neutral-content text-center font-lg ">
                  <div className="mb-0.5">
                    is&nbsp;
                    <span className={`font-bold ${textColor}`}>
                      {betStatus == BetStatus.LOSER ? "NOT " : ""}
                      {currentBet.isHigherBet ? "HIGHER" : "LOWER"}
                    </span>
                    &nbsp;than
                  </div>
                  <div className="font-mono text-lg">{formattedBetPrice}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtcPrice;
