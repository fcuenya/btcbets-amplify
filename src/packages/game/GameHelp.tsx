import { useRef, useEffect } from "react";

type GameHelpProps = {
  isVisible?: boolean;
  onClose?: () => void;
};

const GameHelp = ({ isVisible = false, onClose = () => {} }: GameHelpProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    isVisible ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [isVisible, dialogRef]);

  return (
    <dialog className="modal" ref={dialogRef} onClose={onClose}>
      <div className="modal-box bg-neutral text-neutral-content">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 pl-px"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <div className="font-mono">
          <h3 className="font-bold text-lg">Game Rules</h3>
          <ol className="list-decimal ml-8">
            <li className="py-4">
              The current Bitcoin price is displayed at the top and changes in
              real-time.
            </li>
            <li className="pb-4">
              Click on the buttons at the bottom to guess whether its next value
              will be lower or higher. You can only place one guess at a time.
            </li>
            <li>
              Your guess will resolve in 60s. If you guessed right, 1 point will
              be added to your score. Otherwise, 1 point will be deducted from
              it.
            </li>
          </ol>
          {/* <p className="py-4">
            Try to guess the next Bitcoin price by clicking on the buttons at
            the bottom (lower / higher).
          </p>
          <p className="py-4">
            Once you place your guess, it will resolve in 60s.
          </p>
          <p className="py-4">
            If you guessed right you will get 1 point added to your score,
            otherwise 1 point will be deducted from it.
          </p>
          <p className="py-4">You can only place one guess at a time.</p> */}
        </div>
      </div>
    </dialog>
  );
};

export default GameHelp;
