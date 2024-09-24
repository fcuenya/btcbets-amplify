import { BetStatus } from "./types.d";
import BetScore from "./BetScore";

describe("<BetScore />", () => {
  it("renders", () => {
    cy.mount(
      <BetScore
        betStatus={BetStatus.READY}
        userScore={0}
        betProcessingTimeout={0}
        betResolvingTimeout={0}
      />
    );
  });
});
