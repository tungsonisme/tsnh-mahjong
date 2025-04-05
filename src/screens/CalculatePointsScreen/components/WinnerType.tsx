import { observer } from "mobx-react-lite";
import Radio from "./Radio";
import mahjongStore from "../../../stores/mahjong";
import { WinType } from "../../../stores/mahjong/consts";
import styles from "../styles.module.scss";

function WinnerType() {
  const {
    currentRoundResult,
    eastPlayer,
    northPlayer,
    southPlayer,
    westPlayer,
  } = mahjongStore;

  const nonWiningPlayers = [
    eastPlayer,
    northPlayer,
    southPlayer,
    westPlayer,
  ].filter((player) => player.name !== currentRoundResult?.winnerName);

  return (
    <div>
      <div className={styles.title}>Cách ù</div>
      <Radio
        value={currentRoundResult?.winType}
        options={[
          WinType.STEAL,
          WinType.SELF_DRAW,
          WinType.SELF_DRAW_LAST_CARD,
        ].map((type) => ({
          label: type,
          value: type,
        }))}
        onChange={(value) => {
          mahjongStore.setCurrentRoundResult({
            winType: value as WinType,
            victimName: "",
            isAllSteal: false,
            isAllPick: false,
            isAllPongAndSelfWin: false,
          });
        }}
      />

      {currentRoundResult?.winType === WinType.STEAL && (
        <div>
          <div className={styles.title}>Bonus khi khi cướp để ù</div>
          <Radio
            value={Number(currentRoundResult?.isAllSteal === true)}
            options={[
              {
                label: "Các sảnh đều từ cướp (+ 1 phán)",
                value: Number(true),
              },
            ]}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                isAllSteal: Boolean(value),
              });
            }}
            allowUnselect
          />
          <div className={styles.title}>Nạn nhân</div>
          <Radio
            value={currentRoundResult?.victimName ?? ""}
            options={nonWiningPlayers.map((player) => ({
              label: player.name,
              value: player.name,
            }))}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                victimName: value as string,
              });
            }}
          />
        </div>
      )}

      {[WinType.SELF_DRAW, WinType.SELF_DRAW_LAST_CARD].includes(
        currentRoundResult?.winType,
      ) && (
        <div>
          <div className={styles.title}>Bonus khi tự bốc để ù</div>
          <Radio
            style={{ marginBottom: 0 }}
            value={Number(currentRoundResult?.isAllPick === true)}
            options={[
              {
                label: "Các sảnh đều tự bốc (+ 1 phán)",
                value: Number(true),
              },
            ]}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                isAllPick: Boolean(value),
              });
            }}
            allowUnselect
          />
          <Radio
            value={Number(currentRoundResult?.isAllPongAndSelfWin === true)}
            options={[
              {
                label: "Toàn Phỗng và tự bốc để ù (+ 8 phán)",
                value: Number(true),
              },
            ]}
            onChange={(value) => {
              mahjongStore.setCurrentRoundResult({
                isAllPongAndSelfWin: Boolean(value),
              });
            }}
            allowUnselect
          />
        </div>
      )}
    </div>
  );
}

export default observer(WinnerType);
