type BtcProps = { btcPrice: number; betProcessingTimeout: number };

const BtcPrice = ({ btcPrice, betProcessingTimeout }: BtcProps) => {
  //FIXME: parameterize this based off useGameState.BET_PROCESSING_TIMEOUT
  const percentComplete = 100 - betProcessingTimeout / 150;
  //TODO: do the rounding here
  const formattedBtcPrice = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "USD",
  }).format(btcPrice);

  return (
    <div className="flex flex-row place-content-around">
      <div
        className={`radial-progress ${
          percentComplete > 0 ? "" : "text-transparent"
        } border-neutral border-2`}
        style={
          {
            "--value": percentComplete,
            "--size": "12rem",
            "--thickness": "3px",
          } as React.CSSProperties
        }
        role="progressbar"
      >
        <div className="text-base-content text-center">
          <div>Current BTC price</div>
          <div>USD {formattedBtcPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default BtcPrice;
