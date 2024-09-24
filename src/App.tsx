import { useEffect } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { BetStatus } from "./types.d";
import useGameState from "./useGameState";
import BtcPrice from "./BtcPrice";
import BetScore from "./BetScore";
import BetPicker from "./BetPicker";

const App = () => {
  //DEBUG PERFORMANCE
  useEffect(() => {
    console.log("mounted");
  }, []);
  console.log("rendered");
  //

  const gameState = useGameState();

  if (gameState) {
    const {
      btcPrice,
      userScore,
      betStatus,
      betProcessingTimeout,
      betResolvingTimeout,
      currentBet,
      makeBet,
      resetBet,
    } = gameState;

    const isBetResolved =
      betStatus == BetStatus.WINNER || betStatus == BetStatus.LOSER;
    //TODO: optimizations
    // - memoize BtcPrice and other components

    let statusTitle = "";
    let textColor = "";
    switch (betStatus) {
      case BetStatus.PROCESSING:
      case BetStatus.RESOLVING:
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
      <Authenticator>
        {({ user, signOut }) => (
          <div className="flex flex-col grow">
            <header>
              <div className="flex flex-row navbar bg-base-100 border-b border-slate-700">
                <div className="flex-1 text-xl">Bitcoin Bets!</div>
                <div className="flex-none">
                  {/* <span>username: {user?.username}</span>
                  <span>userId: {user?.userId}</span> */}
                  <span>{user?.signInDetails?.loginId}</span>
                  <button className="btn btn-link" onClick={signOut}>
                    Sign out
                  </button>
                </div>
              </div>
            </header>
            <main className="flex flex-col grow flex-wrap place-content-center relative">
              <div className="flex flex-col w-1/3 place-content-center">
                <div className="flex flex-row justify-center items-end">
                  <h2
                    className={`flex flex-row justify-center items-center text-2xl font-semi-bold mt-10 ${textColor}`}
                  >
                    {statusTitle}
                    <div
                      className="tooltip tooltip-right tooltip-primary"
                      data-tip="Game Rules"
                    >
                      <button className="btn btn-link px-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </h2>
                </div>
                <div className="flex flex-row place-content-center mt-10">
                  <BtcPrice
                    btcPrice={btcPrice}
                    currentBet={currentBet}
                    betStatus={betStatus}
                    betProcessingTimeout={betProcessingTimeout}
                  />
                </div>
                <div className="flex flex-row place-content-center my-10">
                  <BetScore
                    userScore={userScore}
                    betStatus={betStatus}
                    betProcessingTimeout={betProcessingTimeout}
                    betResolvingTimeout={betResolvingTimeout}
                    currentBet={currentBet}
                  />
                </div>
                <BetPicker
                  betStatus={betStatus}
                  makeBet={makeBet}
                  resetBet={resetBet}
                />
              </div>
              <div
                role="alert"
                className="alert absolute z-40 top-5 right-7 w-96 h-96 flex flex-col font-mono text-xs"
              >
                {currentBet && (
                  <div className="flex flex-col gap-y-4">
                    <div>
                      Your are currently betting{" "}
                      {currentBet.isHigherBet ? "HIGH" : "LOW"} on{" "}
                      {currentBet.betPrice}
                    </div>
                    {betStatus == BetStatus.PROCESSING ? (
                      <div>
                        Your bet is being processed (
                        {betProcessingTimeout / 1000} seconds left)
                      </div>
                    ) : null}
                    {betStatus == BetStatus.RESOLVING ? (
                      <div>
                        Your bet is being resolved ({betResolvingTimeout / 1000}{" "}
                        seconds left)
                      </div>
                    ) : null}
                    {isBetResolved && (
                      <div>
                        You {betStatus == BetStatus.WINNER ? "WON" : "LOST"}{" "}
                        your {currentBet.isHigherBet ? "HIGH" : "LOW"} bet on{" "}
                        {currentBet.betPrice} since the btc price was{" "}
                        {currentBet.finalPrice} when the bet was resolved
                      </div>
                    )}
                  </div>
                )}
              </div>
            </main>
            <footer>
              <br />
            </footer>
          </div>
        )}
      </Authenticator>
    );
  }

  return <div>Initializing game...</div>;
};

export default App;
