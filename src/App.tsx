import { observer } from "mobx-react-lite";
import ConfirmModal from "./components/ConfirmModal";
import ManualButton from "./components/ManualButton";
import ResetButton from "./components/ResetButton";
import CalculatePointsScreen from "./screens/CalculatePointsScreen";
import LockScreen from "./screens/LockScreen";
import PlayingScreen from "./screens/PlayingScreen";
import SetupPlayersScreen from "./screens/SetupPlayersScreen";
import mahjongStore from "./stores/mahjong";
import { MahjongStep } from "./stores/mahjong/consts";

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

    if (mahjongStore.step === MahjongStep.CALCULATE_POINTS) {
      return <CalculatePointsScreen />;
    }

    return <></>;
  })();

  return (
    <>
      {screen}
      <ResetButton />
      <ManualButton />
      <ConfirmModal />
    </>
  );
}

export default observer(App);
