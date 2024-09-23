import { BetStatus } from "./types.d";

type BetPickerProps = {
  betStatus: BetStatus;
  makeBet: (isHigherBet: boolean) => void;
  resetBet: () => void;
};

const BetPicker = ({ betStatus, makeBet, resetBet }: BetPickerProps) => {
  const isBetResolved =
    betStatus == BetStatus.WINNER || betStatus == BetStatus.LOSER;

  return (
    <div>
      <div className="flex flex-row place-content-around">
        <button
          className="btn btn-primary w-28 h-28 rounded-full"
          disabled={betStatus != BetStatus.READY}
          onClick={() => makeBet(false)}
        >
          <div className="flex flex-row place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
            <div>Bet lower</div>
          </div>
        </button>
        <button
          className={`btn btn-primary w-28 h-28 rounded-full ${
            isBetResolved ? "" : "invisible"
          }`}
          disabled={!isBetResolved}
          onClick={() => resetBet()}
        >
          <div className="flex flex-row place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <div>Bet again</div>
          </div>
        </button>
        <button
          className="btn btn-primary w-28 h-28 rounded-full"
          disabled={betStatus != BetStatus.READY}
          onClick={() => makeBet(true)}
        >
          <div className="flex flex-row-reverse place-content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
            <div>Bet higher</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default BetPicker;
