import styles from "./styles.module.scss";
import PlayingGif from "../../assets/playing.gif";
import mahjongStore from "../../stores";
import { PASS_CODE } from "../../stores/consts";

function PlayingScreen() {
  return (
    <div>
      <div className={styles.title}>Chiến thôi!</div>

      <div className={styles.image}>
        <img src={PlayingGif} />
      </div>

      <div className={styles.button}>
        <button
          className={styles.backButton}
          onClick={() => {
            mahjongStore.enterSetupPlayersScreen(PASS_CODE);
          }}
        >
          Quay lại
        </button>

        <button
          onClick={() => {
            mahjongStore.finishPlaying();
          }}
        >
          Xong ván
        </button>
      </div>
    </div>
  );
}

export default PlayingScreen;
