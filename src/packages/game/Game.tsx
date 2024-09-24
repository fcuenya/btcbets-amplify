import { useState } from "react";
import { BetStatus } from "./types.d";
import useGameState from "./useGameState";
import BetTracker from "./BetTracker";
import BetPicker from "./BetPicker";
import HelpButton from "./HelpButton";
import GameHelp from "./GameHelp";

const getStatusTitle = (betStatus: BetStatus): string => {
  switch (betStatus) {
    case BetStatus.PROCESSING:
    case BetStatus.RESOLVING:
      return "In progress...";
    case BetStatus.WINNER:
      return "Congrats, you've got it!";
    case BetStatus.LOSER:
      return "Wrong guess, try again!";
    default:
      return "Guess the next Bitcoin price!";
  }
};

const Game = () => {
  //TODO: optimizations

  const [isHelpVisible, setIsHelpVisible] = useState(false);
  const gameState = useGameState();

  let gameContent = (
    <div className="flex flex-row jusfity-end items-end">
      <span className="font-bold text-lg mr-1">Loading</span>
      <span className="loading loading-dots loading-md"></span>
    </div>
  );

  if (gameState) {
    const {
      btcPrice,
      userScore,
      betStatus,
      betProcessingTimeout,
      currentBet,
      makeBet,
      resetBet,
    } = gameState;

    gameContent = (
      <>
        <div className="flex flex-col place-content-center card shadow-xl bg-base-100">
          <div className="card-body relative">
            <div className="card-title justify-center pt-3">
              <h2 className="text-2xl">{getStatusTitle(betStatus)}</h2>
            </div>
            <BetTracker
              btcPrice={btcPrice}
              userScore={userScore}
              betStatus={betStatus}
              betProcessingTimeout={betProcessingTimeout}
              currentBet={currentBet}
            />
            <BetPicker
              betStatus={betStatus}
              makeBet={makeBet}
              resetBet={resetBet}
            />
          </div>
        </div>
        <HelpButton
          className="absolute bottom-3 right-3"
          onClick={() => setIsHelpVisible(true)}
        />
        <GameHelp
          isVisible={isHelpVisible}
          onClose={() => setIsHelpVisible(false)}
        />
      </>
    );
  }

  return (
    <div className="flex flex-col grow flex-wrap bg-gradient-to-t from-violet-600 via-stone-200 to-stone-200">
      <div className="flex flex-col grow flex-wrap place-content-center relative">
        {gameContent}
      </div>
    </div>
  );
};

export default Game;
