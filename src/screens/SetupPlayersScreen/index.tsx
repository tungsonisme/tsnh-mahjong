import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import TableImage from "../../assets/table.png";
import mahjongStore from "../../stores/mahjong";
import ViewResultsButton from "../../components/ViewResultsButton";

function SetupPlayersScreen() {
  const { northPlayer, southPlayer, eastPlayer, westPlayer } = mahjongStore;
  const { name: northPlayerName } = northPlayer;
  const { name: southPlayerName } = southPlayer;
  const { name: eastPlayerName } = eastPlayer;
  const { name: westPlayerName } = westPlayer;

  const handleSubmit = () => {
    mahjongStore.playGame();
  };

  return (
    <div>
      <div className={styles.gateImages}>
        <img src={TableImage} />
      </div>

      <div className={styles.south}>
        <input
          placeholder="Nam"
          value={southPlayerName}
          onChange={(e) =>
            mahjongStore.updatePlayerName({
              southPlayerName: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.westAndEast}>
        <input
          placeholder="Tây"
          value={westPlayerName}
          onChange={(e) =>
            mahjongStore.updatePlayerName({
              westPlayerName: e.target.value,
            })
          }
        />
        <input
          placeholder="Đông"
          value={eastPlayerName}
          onChange={(e) =>
            mahjongStore.updatePlayerName({
              eastPlayerName: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.north}>
        <input
          placeholder="Bắc"
          value={northPlayerName}
          onChange={(e) =>
            mahjongStore.updatePlayerName({
              northPlayerName: e.target.value,
            })
          }
        />
      </div>

      <div className={styles.buttons}>
        <ViewResultsButton />
        <button onClick={handleSubmit}>Chiến!</button>
      </div>
    </div>
  );
}

export default observer(SetupPlayersScreen);
