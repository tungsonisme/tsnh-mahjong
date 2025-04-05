import styles from "./styles.module.scss";
import PlayingGif from "../../assets/playing.gif";
import ViewResultsButton from "../../components/ViewResultsButton";
import mahjongStore from "../../stores/mahjong";
import { PASS_CODE } from "../../stores/mahjong/consts";

function PlayingScreen() {
  return (
    <div>
      <div className={styles.title}>Chiến!</div>

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

        <ViewResultsButton />

        <button
          onClick={() => {
            mahjongStore.finishPlaying();
          }}
        >
          Tính điểm
        </button>
      </div>
    </div>
  );
}

export default PlayingScreen;
