import Auth from "./packages/core/auth/Auth";
import Game from "./packages/game/Game";

const App = () => {
  const isAuthEnabled: boolean = !import.meta.env.VITE_AMPLIFY_DISABLED;
  return isAuthEnabled ? (
    <Auth>
      <Game />
    </Auth>
  ) : (
    <Game />
  );
};

export default App;
