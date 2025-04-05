import styles from "./styles.module.scss";
import mahjongStore from "../../stores/mahjong";

function ResetButton() {
  return (
    <div className={styles.resetButton}>
      <div onClick={() => mahjongStore.reset()}>Reset</div>
    </div>
  );
}

export default ResetButton;
