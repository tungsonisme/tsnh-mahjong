import { observer } from "mobx-react-lite";
import styles from "./styles.module.scss";
import mahjongStore from "../../stores/mahjong";

function ViewResultsButton() {
  const {
    results,
    eastPlayer,
    southPlayer,
    westPlayer,
    northPlayer,
    viewResults,
  } = mahjongStore;
  const allPlayerNames = [
    eastPlayer.name,
    southPlayer.name,
    westPlayer.name,
    northPlayer.name,
  ];
  const finalResults = {
    [eastPlayer.name]: 0,
    [southPlayer.name]: 0,
    [westPlayer.name]: 0,
    [northPlayer.name]: 0,
  };

  results.forEach((result) => {
    if (result.victimName) {
      finalResults[result.winnerName] += (result.points ?? 0) * 4;
      finalResults[result.victimName] -= (result.points ?? 0) * 2;

      allPlayerNames
        .filter(
          (name) => name !== result.winnerName && name !== result.victimName,
        )
        .forEach((name) => {
          finalResults[name] -= result.points ?? 0;
        });
    } else {
      finalResults[result.winnerName] += (result.points ?? 0) * 3;

      allPlayerNames.forEach((name) => {
        if (name !== result.winnerName) {
          finalResults[name] -= result.points ?? 0;
        }
      });
    }
  });

  return (
    <>
      <button
        className={styles.viewResultsButton}
        onClick={() => {
          mahjongStore.setViewResults(true);
        }}
      >
        Bảng điểm
      </button>

      {viewResults && (
        <div className={styles.results}>
          <div className={styles.resultsTitle}>Bảng điểm</div>

          <div className={styles.resultsList}>
            {results.map((result, index) => (
              <div className={styles.result} key={index}>
                <div className={styles.resultRow}>Ván {index + 1}</div>
                <div className={styles.resultWinner}>
                  <b>{result.winnerName}</b> thắng
                  {result.victimName && (
                    <>
                      <br />
                      và <b>{result.victimName}</b> là nạn nhân
                    </>
                  )}
                </div>
                <div className={styles.resultPoints}>{result.points} Phán</div>
              </div>
            ))}
          </div>

          {Object.keys(finalResults).length === 4 && (
            <div className={styles.finalResults}>
              {Object.entries(finalResults).map(([name, points]) => (
                <div className={styles.finalResult} key={name}>
                  <div>{name}</div>
                  <div>{points} đơn vị tiền</div>
                </div>
              ))}
            </div>
          )}

          <button
            className={styles.closeButton}
            onClick={() => {
              mahjongStore.setViewResults(false);
            }}
          >
            Không xem nữa
          </button>
        </div>
      )}
    </>
  );
}

export default observer(ViewResultsButton);
