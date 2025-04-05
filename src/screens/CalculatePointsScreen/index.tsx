import Buttons from "./components/Buttons";
import Flower from "./components/Flower";
import OtherBonuses from "./components/OtherBonuses";
import SpecialHand from "./components/SpecialHand";
import Winner from "./components/Winner";
import WinnerType from "./components/WinnerType";
import styles from "./styles.module.scss";

function CalculatePointsScreen() {
  return (
    <div>
      <div className={styles.screenTitle}>Tính Điểm</div>
      <div className={styles.screenContent}>
        <Winner />
        <WinnerType />
        <OtherBonuses />
        <SpecialHand />
        <Flower />
        <Buttons />
      </div>
    </div>
  );
}

export default CalculatePointsScreen;
