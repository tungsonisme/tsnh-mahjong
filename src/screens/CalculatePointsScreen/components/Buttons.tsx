import { observer } from "mobx-react-lite";
import mahjongStore from "../../../stores/mahjong";
import styles from "../styles.module.scss";

function Buttons() {
  return (
    <div className={styles.concludeResultButton}>
      <button
        style={{
          color: "red",
          marginBottom: "12px",
        }}
        onClick={() => {
          mahjongStore.playGame();
        }}
      >
        Quay lại chơi típ
      </button>

      <button
        onClick={() => {
          mahjongStore.concludeCurrentRound();
        }}
      >
        Chốt ván (+{mahjongStore.currentRoundResultPoints} Phán)
      </button>
    </div>
  );
}

export default observer(Buttons);
