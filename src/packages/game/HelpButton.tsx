type HelpButtonProps = {
  className?: string;
  onClick?: () => void;
};

const HelpButton = ({ className, onClick = () => {} }: HelpButtonProps) => (
  <div className={`flex ${className || ""}`}>
    <div className="flex tooltip tooltip-left" data-tip="Game Rules">
      <button
        className="btn btn-neutral btn-circle btn-sm"
        onClick={() => {
          onClick();
        }}
      >
        <span className="w-full text-center pl-px">i</span>
      </button>
    </div>
  </div>
);

export default HelpButton;
