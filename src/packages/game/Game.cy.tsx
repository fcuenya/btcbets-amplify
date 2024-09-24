import Game from "./Game";

describe(
  "<Game />",
  {
    viewportHeight: 800,
    viewportWidth: 800,
  },
  () => {
    beforeEach(() => {
      cy.mount(<Game />);
    });

    it("renders the main screen", () => {
      cy.contains("Guess the next Bitcoin price!").should("exist");
    });

    it("should start processing a guess once the 'lower' or 'higher' buttons are pressed", () => {
      cy.get("button:not(.invisible)").should("not.be.disabled");
      cy.get("button.invisible").should("be.disabled");
      cy.get("button.invisible").contains("Retry");
      cy.get("button").contains("Lower").should("exist");
      cy.get(".radial-progress").contains("is LOWER than").should("not.exist");
      cy.get("button").contains("Lower").click();
      cy.get(".radial-progress").contains("is LOWER than").should("exist");
      cy.get("button").should("be.disabled");
    });
  }
);
