# Bitcoin Guessing Game

This is a web application that implements a game consisting of guessing the USD market price of Bitcoin in the next 60 seconds. These are the rules:

- The player can at all times see their current score and the latest available BTC price in USD.
- The player can choose to enter a guess of either “up” or “down“.
- After a guess is entered the player cannot make new guesses until the existing guess is resolved.
- The guess is resolved when the price changes and at least 60 seconds have passed since the guess was made.
- If the guess is correct (up = price went higher, down = price went lower), the user gets 1 point added to their score. If the guess is incorrect, the user loses 1 point.
- Players can only make one guess at a time.
- New players start with a score of 0.

The provided solution also took into consideration the following requirements:

- The guesses should be resolved fairly using BTC price data from any available 3rd party API ([Coinbase](https://www.coinbase.com/)).
- The score of each player should be persisted in a backend data store (AWS services preferred).
- Players should be able to close their browser and return back to see their score and continue to make more guesses.
- Testing is encouraged.

## Getting started

There is an instance of the app deployed to AWS and available at . In any case, below are the instructions for running it both locally and in the cloud.

### Local run

This will allow for running the application locally without wiring it to the AWS cloud. Note that in this mode the user score will not be persisted. This particularly is useful for offline local development.

To enable this mode, follow these steps:

1. Clone this repo.
2. Install its dependencies via `npm run i`.
3. Add a file to the root of the project named `env.local`. The contents of this file should be `VITE_AMPLIFY_DISABLED=true`
4. Start the application via `npm run dev`.
5. Open http://localhost:5173 (or the address shown in your terminal) in your web browser to see the app.

### AWS deployment

To deploy the app to AWS Amplify, these simple steps should be followed:

1. Clone this repo.
2. Follow this [quickstart tutorial](https://docs.amplify.aws/react/start/quickstart/) from the AWS Amplify docs, starting directly from the second bullet point "Deploy to AWS". Follow the tutorial to finish the deployment.

## Tech stack

The bulk of the application runs in the browser and has been built with following technologies:

- [React](https://react.dev), for UI components.
- [TailwindCSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com), for styling.
- [Vite](https://vitejs.dev), for building and local development.
- [Cypress.io](https://www.cypress.io), for component tests.

[AWS Amplify](https://aws.amazon.com/es/amplify/?gclid=CjwKCAjw6c63BhAiEiwAF0EH1BCW2xkWtGBhGCN81UQ0Ei19lhfOSE-Nlu6IY8LjqPbtt2WW-OC2tBoCi70QAvD_BwE&trk=b3758737-5a29-4b80-ba84-b0402054ae6c&sc_channel=ps&ef_id=CjwKCAjw6c63BhAiEiwAF0EH1BCW2xkWtGBhGCN81UQ0Ei19lhfOSE-Nlu6IY8LjqPbtt2WW-OC2tBoCi70QAvD_BwE:G:s&s_kwcid=AL!4422!3!647301992092!e!!g!!aws%20amplify!19621370357!148358957689) is used for for hosting, CI/CD and for building the backend, supporting the following features:

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

The [Coinbase websocket service](https://docs.cdp.coinbase.com/exchange/docs/websocket-overview#protocol) was used to provide the real-time Bitcoin price used in the game.

## Repository structure

The code in this repo is split into two main folders, `amplify` for the infrastructure setup and `src` for the frontend code. This mimics the `amplify-vite-react-template` it was based off.

The UI logic lives under the `src` folder and is organized into packages:

- `core`: for cross-cutting concerns
  - `auth`: logic and components for leveraging AWS authentication
  - `data`: custom hoks for interfacing with the Coinbase API and the AWS database
  - `util`: "catch-all" folder for shared types and utilities
- `game`: hosting the core logic and UI components for the application
- `App.tsx`: wrapper component for "wiring up" the app to AWS services
- `main.tsx`: React entry point
- `index.html`: Build (Vite) entry point
