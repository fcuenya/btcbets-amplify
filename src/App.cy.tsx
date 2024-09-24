import App from "./App";

describe(
  "<App />",
  {
    viewportHeight: 800,
    viewportWidth: 800,
  },
  () => {
    it("renders", () => {
      cy.mount(<App />);
    });
  }
);
