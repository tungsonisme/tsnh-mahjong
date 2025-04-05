import { observer } from "mobx-react-lite";
import Radio from "./Radio";
import mahjongStore from "../../../stores/mahjong";
import { HasFlower } from "../../../stores/mahjong/consts";
import styles from "../styles.module.scss";

function Flower() {
  const { currentRoundResult } = mahjongStore;

  return (
    <div>
      <div className={styles.title}>Hoa</div>
      <Radio
        value={currentRoundResult?.hasFlower}
        options={[
          { label: HasFlower.YES, value: HasFlower.YES },
          { label: HasFlower.NO, value: HasFlower.NO },
        ].map((option) => ({
          label: option.label,
          value: option.value,
        }))}
        onChange={(value) => {
          mahjongStore.setCurrentRoundResult({
            hasFlower: value as HasFlower,
          });
        }}
        allowUnselect
      />

      {currentRoundResult?.hasFlower === HasFlower.YES && (
        <div>
          <div className={styles.title}>Bonus khi có hoa</div>
          <Radio
            value={Number(
              currentRoundResult?.hasRedFlowerWithSameWind === true,
            )}
            options={[
              {
                label: "Có hoa đỏ cùng Gió (+1 phán)",
                value: Number(true),
              },
            ]}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                hasRedFlowerWithSameWind: Boolean(value),
              });
            }}
            allowUnselect
          />
          <Radio
            value={Number(
              currentRoundResult?.hasBlueFlowerWithSameWind === true,
            )}
            options={[
              {
                label: "Có hoa xanh cùng Gió (+1 phán)",
                value: Number(true),
              },
            ]}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                hasBlueFlowerWithSameWind: Boolean(value),
              });
            }}
            allowUnselect
          />
          <Radio
            value={Number(currentRoundResult?.has4RedFlowers === true)}
            options={[
              {
                label: "Có 4 hoa đỏ (+ 2 phán)",
                value: Number(true),
              },
            ]}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                has4RedFlowers: Boolean(value),
              });
            }}
            allowUnselect
          />
          <Radio
            value={Number(currentRoundResult?.has4BlueFlowers === true)}
            options={[
              {
                label: "Có 4 hoa xanh (+ 2 phán)",
                value: Number(true),
              },
            ]}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                has4BlueFlowers: Boolean(value),
              });
            }}
            allowUnselect
          />
        </div>
      )}
    </div>
  );
}

export default observer(Flower);
