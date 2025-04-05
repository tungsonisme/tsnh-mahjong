import { observer } from "mobx-react-lite";
import Radio from "./Radio";
import mahjongStore from "../../../stores/mahjong";
import styles from "../styles.module.scss";

function Winner() {
  const {
    currentRoundResult,
    eastPlayer,
    northPlayer,
    southPlayer,
    westPlayer,
  } = mahjongStore;

  return (
    <div>
      <div className={styles.title}>Người thắng</div>
      <Radio
        value={currentRoundResult?.winnerName ?? ""}
        options={[
          {
            label: eastPlayer?.name ?? "",
            value: eastPlayer?.name ?? "",
          },
          {
            label: northPlayer?.name ?? "",
            value: northPlayer?.name ?? "",
          },
          {
            label: southPlayer?.name ?? "",
            value: southPlayer?.name ?? "",
          },
          {
            label: westPlayer?.name ?? "",
            value: westPlayer?.name ?? "",
          },
        ]}
        onChange={(value) => {
          mahjongStore.setCurrentRoundResult({
            winnerName: value as string,
            victimName: "",
          });
        }}
      />
    </div>
  );
}

export default observer(Winner);
