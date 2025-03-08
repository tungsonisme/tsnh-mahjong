import { observer } from "mobx-react-lite";
import LockScreen from "./components/LockScreen";
import PlayingScreen from "./components/PlayingScreen";
import SetupPlayersScreen from "./components/SetupPlayersScreen";
import mahjongStore from "./stores";
import { MahjongStep } from "./stores/consts";

function App() {
  const screen = (() => {
    if (mahjongStore.step === MahjongStep.LOCK_SCREEN) {
      return <LockScreen />;
    }

    if (mahjongStore.step === MahjongStep.SETUP_PLAYERS) {
      return <SetupPlayersScreen />;
    }

    if (mahjongStore.step === MahjongStep.PLAY) {
      return <PlayingScreen />;
    }

    return <></>;
  })();

  return screen;
}

export default observer(App);
