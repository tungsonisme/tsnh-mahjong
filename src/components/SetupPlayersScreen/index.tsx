import { observer } from "mobx-react-lite";
import { useState } from "react";
import styles from "./styles.module.scss";
import GateImages from "../../assets/gates.png";
import mahjongStore from "../../stores";

function SetupPlayersScreen() {
  const [northPlayerName, setNorthPlayerName] = useState(
    mahjongStore.northPlayer?.name,
  );
  const [southPlayerName, setSouthPlayerName] = useState(
    mahjongStore.southPlayer?.name,
  );
  const [eastPlayerName, setEastPlayerName] = useState(
    mahjongStore.eastPlayer?.name,
  );
  const [westPlayerName, setWestPlayerName] = useState(
    mahjongStore.westPlayer?.name,
  );

  const canPlay =
    northPlayerName && southPlayerName && eastPlayerName && westPlayerName;

  const handleSubmit = () => {
    mahjongStore.playGame({
      northPlayerName,
      southPlayerName,
      eastPlayerName,
      westPlayerName,
    });
  };

  return (
    <div>
      <div className={styles.title}>Điền vị trí người chơi vào đúng cổng</div>

      <div className={styles.gateImages}>
        <img src={GateImages} />
      </div>

      <div className={styles.north}>
        <input
          placeholder="Bắc"
          value={northPlayerName}
          onChange={(e) => setNorthPlayerName(e.target.value)}
        />
      </div>

      <div className={styles.westAndEast}>
        <input
          placeholder="Tây"
          value={westPlayerName}
          onChange={(e) => setWestPlayerName(e.target.value)}
        />
        <input
          placeholder="Đông"
          value={eastPlayerName}
          onChange={(e) => setEastPlayerName(e.target.value)}
        />
      </div>

      <div className={styles.south}>
        <input
          placeholder="Nam"
          value={southPlayerName}
          onChange={(e) => setSouthPlayerName(e.target.value)}
        />
      </div>

      {canPlay && (
        <div className={styles.playButton}>
          <button onClick={handleSubmit}>Chơi</button>
        </div>
      )}
    </div>
  );
}

export default observer(SetupPlayersScreen);
