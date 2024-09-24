import { BetStatus } from "./types.d";
import BetPicker from "./BetPicker";

describe("<BetPicker />", () => {
  it("renders", () => {
    cy.mount(
      <BetPicker
        betStatus={BetStatus.READY}
        makeBet={() => {}}
        resetBet={() => {}}
      />
    );
  });
});
