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

  const {
    btcPrice,
    userScore,
    betStatus,
    betProcessingTimeout,
    betResolvingTimeout,
    currentBet,
    makeBet,
    resetBet,
  } = useGameState();

  const isBetResolved =
    betStatus == BetStatus.WINNER || betStatus == BetStatus.LOSER;
  //TODO: optimizations
  // - memoize BtcPrice and other components

  return (
    <Authenticator>
      {({ user, signOut }) => (
        <div className="flex flex-col grow">
          <header>
            <div className="flex flex-row navbar bg-base-100 border-b border-slate-700">
              <div className="flex-1 text-xl">BTC Bets!</div>
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
              <div className="flex flex-row place-content-center">
                <BetScore
                  userScore={userScore}
                  betStatus={betStatus}
                  betProcessingTimeout={betProcessingTimeout}
                  betResolvingTimeout={betResolvingTimeout}
                  currentBet={currentBet}
                />
              </div>
              <div className="flex flex-row place-content-center mt-12 mb-10">
                <BtcPrice
                  btcPrice={btcPrice}
                  betProcessingTimeout={betProcessingTimeout}
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
                      Your bet is being processed ({betProcessingTimeout / 1000}{" "}
                      seconds left)
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
                      You {betStatus == BetStatus.WINNER ? "WON" : "LOST"} your{" "}
                      {currentBet.isHigherBet ? "HIGH" : "LOW"} bet on{" "}
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
};

export default App;
