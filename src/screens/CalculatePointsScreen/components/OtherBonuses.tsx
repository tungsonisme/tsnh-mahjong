import { observer } from "mobx-react-lite";
import Radio from "./Radio";
import mahjongStore from "../../../stores/mahjong";
import styles from "../styles.module.scss";

function OtherBonuses() {
  const { currentRoundResult } = mahjongStore;

  return (
    <div>
      <div className={styles.title}>Bonus khác</div>
      <Radio
        value={Number(currentRoundResult?.hasPongOrChowWithSameWind === true)}
        options={[
          {
            label: "Có Phỗng/Chiếu cùng Gió (+1 phán)",
            value: Number(true),
          },
        ]}
        onChange={(value) => {
          mahjongStore.setCurrentRoundResult({
            hasPongOrChowWithSameWind: Boolean(value),
          });
        }}
        allowUnselect
      />
      <Radio
        value={Number(currentRoundResult?.hasAllWindOrDragon === true)}
        options={[
          {
            label: "Chỉ có Gió và Rồng (+8 phán)",
            value: Number(true),
          },
        ]}
        onChange={(value) => {
          mahjongStore.setCurrentRoundResult({
            hasAllWindOrDragon: Boolean(value),
          });
        }}
        allowUnselect
      />
    </div>
  );
}

export default observer(OtherBonuses);
