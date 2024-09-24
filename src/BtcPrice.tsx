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

  let textColor = "";
  switch (betStatus) {
    case BetStatus.WINNER:
      textColor = "text-success";
      break;
    case BetStatus.LOSER:
      textColor = "text-error";
      break;
    default:
  }

  const isProcessingBet =
    betStatus == BetStatus.PROCESSING || betStatus == BetStatus.RESOLVING;

  return (
    <div className="flex flex-row relative w-64 h-64 place-content-around">
      <div
        className={`radial-progress ${
          percentComplete > 0 ? textColor : "text-transparent"
        } border-neutral border-2 z-10 ${
          currentBet ? "absolute right-28" : ""
        }`}
        style={
          {
            "--value": percentComplete,
            "--size": "16rem",
            "--thickness": "3px",
            transform: currentBet ? "scaleX(-1)" : "scaleX(1)",
          } as React.CSSProperties
        }
        role="progressbar"
      >
        <div
          className="text-base-content text-center text-lg"
          style={{ transform: currentBet ? "scaleX(-1)" : "scaleX(1)" }}
        >
          <div className="font-bold mb-0.5">Bitcoin price</div>
          <div
            className={`font-mono text-lg ${isProcessingBet ? "blur-sm" : ""} ${
              isProcessingBet || betStatus == BetStatus.READY
                ? "animate-pulse"
                : ""
            }`}
          >
            {activePrice}
          </div>
        </div>
      </div>
      {currentBet ? (
        <div
          className={`radial-progress ${
            percentComplete > 0 ? textColor : "text-transparent"
          } border-neutral border-2 ${
            currentBet ? "absolute left-28" : "invisible"
          }`}
          style={
            {
              "--value": percentComplete,
              "--size": "16rem",
              "--thickness": "3px",
            } as React.CSSProperties
          }
          role="progressbar"
        >
          <div className="text-base-content text-center font-lg">
            <div className="mb-0.5">
              is {betStatus == BetStatus.LOSER ? "NOT" : ""}{" "}
              {currentBet.isHigherBet ? "HIGHER" : "LOWER"} than
            </div>
            <div className="font-mono text-lg">{formattedBetPrice}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BtcPrice;
