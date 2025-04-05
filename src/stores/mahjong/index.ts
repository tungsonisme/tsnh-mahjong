import { makeAutoObservable, computed } from "mobx";
import { makePersistable } from "mobx-persist-store";
import {
  HasFlower,
  MahjongStep,
  PASS_CODE,
  SpecialHandLevel1,
  SpecialHandLevel2,
  WinType,
} from "./consts";
import { Player, Result } from "./types";
import appStore from "../app";

class MahjongStore {
  step: MahjongStep = MahjongStep.LOCK_SCREEN;
  northPlayer: Player = { name: "" };
  southPlayer: Player = { name: "" };
  westPlayer: Player = { name: "" };
  eastPlayer: Player = { name: "" };
  currentRound = 0;
  results: Result[] = [];
  viewResults = false;

  constructor() {
    makeAutoObservable(
      this,
      {
        currentRoundResult: computed,
        currentRoundResultPoints: computed,
      },
      {
        autoBind: true,
      },
    );

    makePersistable(this, {
      name: "MahjongStore",
      properties: [
        "step",
        "northPlayer",
        "southPlayer",
        "westPlayer",
        "eastPlayer",
        "currentRound",
        "results",
        "viewResults",
      ],
      storage: window.localStorage,
    });
  }

  get currentRoundResult() {
    return this.results[this.currentRound];
  }

  get currentRoundResultPoints() {
    const {
      winType,
      isAllSteal,
      isAllPick,
      isAllPongAndSelfWin,
      hasPongOrChowWithSameWind,
      hasAllWindOrDragon,
      specialHandLevel1,
      specialHandLevel2,
      hasFlower,
      hasRedFlowerWithSameWind,
      hasBlueFlowerWithSameWind,
      has4RedFlowers,
      has4BlueFlowers,
    } = this.currentRoundResult ?? {};

    let points = 0;

    if (winType === WinType.STEAL) {
      points += 1;

      if (isAllSteal) {
        points += 1;
      }
    } else {
      if (winType === WinType.SELF_DRAW) {
        points += 1;
      } else if (winType === WinType.SELF_DRAW_LAST_CARD) {
        points += 2;
      }

      if (isAllPick) {
        points += 1;
      }

      if (isAllPongAndSelfWin) {
        points += 8;
      }
    }

    if (hasPongOrChowWithSameWind) {
      points += 1;
    }

    if (hasAllWindOrDragon) {
      points += 8;
    }

    if (specialHandLevel1 === SpecialHandLevel1.IS_ALL_SAME_SUIT) {
      points += 6;
    } else if (specialHandLevel1 === SpecialHandLevel1.IS_ALL_PONG) {
      switch (specialHandLevel2) {
        case SpecialHandLevel2.HAS_2_DRAGON_PONG_AND_1_DRAGON_PAIR:
          points += 3;
          break;
        case SpecialHandLevel2.HAS_3_DRAGON_PONG:
          points += 6;
          break;
        case SpecialHandLevel2.HAS_3_WIND_PONG_AND_1_WIND_PAIR:
          points += 6;
          break;
        case SpecialHandLevel2.HAS_4_WIND_PONG:
          points += 8;
          break;
      }
    }

    if (hasFlower === HasFlower.YES) {
      if (hasRedFlowerWithSameWind) {
        points += 1;
      }

      if (hasBlueFlowerWithSameWind) {
        points += 1;
      }

      if (has4RedFlowers) {
        points += 2;
      }

      if (has4BlueFlowers) {
        points += 2;
      }
    } else if (hasFlower === HasFlower.NO) {
      points += 1;
    }

    return points;
  }

  enterSetupPlayersScreen(passCode: string) {
    if (passCode === PASS_CODE) {
      this.step = MahjongStep.SETUP_PLAYERS;
      return;
    }
  }

  updatePlayerName({
    northPlayerName,
    southPlayerName,
    eastPlayerName,
    westPlayerName,
  }: {
    northPlayerName?: string;
    southPlayerName?: string;
    eastPlayerName?: string;
    westPlayerName?: string;
  }) {
    if (northPlayerName !== undefined) {
      this.northPlayer = {
        name: northPlayerName,
      };
    }

    if (southPlayerName !== undefined) {
      this.southPlayer = {
        name: southPlayerName,
      };
    }

    if (eastPlayerName !== undefined) {
      this.eastPlayer = {
        name: eastPlayerName,
      };
    }

    if (westPlayerName !== undefined) {
      this.westPlayer = {
        name: westPlayerName,
      };
    }
  }

  playGame() {
    const { northPlayer, southPlayer, eastPlayer, westPlayer } = this;

    if (
      !northPlayer.name ||
      !southPlayer.name ||
      !eastPlayer.name ||
      !westPlayer.name
    ) {
      appStore.confirm({
        title: "Lỗi",
        content: "Thiếu người hông có chơi được",
      });
      return;
    }

    if (
      new Set([
        northPlayer.name,
        southPlayer.name,
        eastPlayer.name,
        westPlayer.name,
      ]).size !== 4
    ) {
      appStore.confirm({
        title: "Lỗi",
        content: "Có 2 đứa trùng tên nhau",
      });
      return;
    }

    this.step = MahjongStep.PLAY;
  }

  finishPlaying() {
    this.step = MahjongStep.CALCULATE_POINTS;
  }

  setCurrentRoundResult(result: Partial<Result>) {
    this.results[this.currentRound] = {
      ...this.results[this.currentRound],
      ...result,
    };
  }

  getCanConcludeCurrentRound() {
    const { winnerName, winType, victimName, hasFlower } =
      this.currentRoundResult ?? {};

    if (!winnerName) {
      appStore.confirm({
        title: "Lỗi",
        content: "Ai <b>thắng</b> vậy cha?",
      });
      return false;
    }

    if (!winType) {
      appStore.confirm({
        title: "Lỗi",
        content: `Ủa rồi thằng ${winnerName} nó ù như nào?`,
      });
      return false;
    }

    if (winType === WinType.STEAL && !victimName) {
      appStore.confirm({
        title: "Lỗi",
        content: "Đứa nào bị <b>cướp</b> zậy?",
      });
      return false;
    }

    if (!hasFlower) {
      appStore.confirm({
        title: "Lỗi",
        content: "Có <b>Hoa</b> hay không cũng không nói?",
      });
      return false;
    }

    return true;
  }

  concludeCurrentRound() {
    const canConclude = this.getCanConcludeCurrentRound();

    if (!canConclude) {
      return;
    }

    const { winnerName } = this.currentRoundResult ?? {};

    appStore.confirm({
      title: "Chốt ván",
      content: `Chắc chưa bro?<br/>Người thắng: ${winnerName}<br/>Điểm ván này: ${this.currentRoundResultPoints} Phán`,
      onOk: () => {
        this.results[this.currentRound] = {
          ...this.results[this.currentRound],
          points: this.currentRoundResultPoints,
        };
        this.currentRound++;
        this.step = MahjongStep.SETUP_PLAYERS;
        this.setViewResults(true);
      },
    });
  }

  setViewResults(viewResults: boolean) {
    this.viewResults = viewResults;
  }

  reset() {
    appStore.confirm({
      title: "Chắc chưa chắc chưa?",
      content: "Mọi dữ liệu sẽ bị xoá sạch",
      onOk: () => {
        this.results = [];
        this.currentRound = 0;
        this.step = MahjongStep.SETUP_PLAYERS;
        this.northPlayer = { name: "" };
        this.southPlayer = { name: "" };
        this.eastPlayer = { name: "" };
        this.westPlayer = { name: "" };
        this.setViewResults(false);
      },
    });
  }
}

const mahjongStore = new MahjongStore();

export default mahjongStore;
