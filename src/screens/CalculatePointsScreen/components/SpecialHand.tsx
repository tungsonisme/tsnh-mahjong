import { observer } from "mobx-react-lite";
import Radio from "./Radio";
import mahjongStore from "../../../stores/mahjong";
import { SpecialHandLevel1, SpecialHandLevel2 } from "../../../stores/mahjong/consts";
import styles from "../styles.module.scss";

function SpecialHand() {
  const { currentRoundResult } = mahjongStore;

  return (
    <div>
      <div className={styles.title}>Hand đặc biệt</div>
      <Radio
        value={currentRoundResult?.specialHandLevel1 ?? ""}
        options={[
          SpecialHandLevel1.IS_ALL_SAME_SUIT,
          SpecialHandLevel1.IS_ALL_PONG,
        ].map((level) => ({
          label: level,
          value: level,
        }))}
        onChange={(value) => {
          mahjongStore.setCurrentRoundResult({
            specialHandLevel1: value as SpecialHandLevel1,
            specialHandLevel2: undefined,
          });
        }}
        allowUnselect
      />

      {currentRoundResult?.specialHandLevel1 ===
        SpecialHandLevel1.IS_ALL_PONG && (
        <div>
          <div className={styles.title}>Bonus hand đặc biệt</div>
          <Radio
            value={currentRoundResult?.specialHandLevel2 ?? ""}
            options={[
              SpecialHandLevel2.HAS_2_DRAGON_PONG_AND_1_DRAGON_PAIR,
              SpecialHandLevel2.HAS_3_DRAGON_PONG,
              SpecialHandLevel2.HAS_3_WIND_PONG_AND_1_WIND_PAIR,
              SpecialHandLevel2.HAS_4_WIND_PONG,
            ].map((level) => ({
              label: level,
              value: level,
            }))}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                specialHandLevel2: value as SpecialHandLevel2,
              });
            }}
            allowUnselect
          />
        </div>
      )}
    </div>
  );
}

export default observer(SpecialHand);
