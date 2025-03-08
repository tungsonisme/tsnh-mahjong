import { makeAutoObservable } from "mobx";
import { MahjongStep, PASS_CODE } from "./consts";
import { Player } from "./types";

class MahjongStore {
  step: MahjongStep = MahjongStep.LOCK_SCREEN;
  northPlayer?: Player;
  southPlayer?: Player;
  westPlayer?: Player;
  eastPlayer?: Player;

  constructor() {
    makeAutoObservable(this);
  }

  enterSetupPlayersScreen(passCode: string) {
    if (passCode === PASS_CODE) {
      this.step = MahjongStep.SETUP_PLAYERS;
      return;
    }
  }

  playGame({
    northPlayerName,
    southPlayerName,
    eastPlayerName,
    westPlayerName,
  }: {
    northPlayerName: string;
    southPlayerName: string;
    eastPlayerName: string;
    westPlayerName: string;
  }) {
    this.northPlayer = {
      name: northPlayerName,
    };
    this.southPlayer = {
      name: southPlayerName,
    };
    this.eastPlayer = {
      name: eastPlayerName,
    };
    this.westPlayer = {
      name: westPlayerName,
    };

    this.step = MahjongStep.PLAY;
  }

  finishPlaying() {
    this.step = MahjongStep.CALCULATE_POINTS;
  }
}

const mahjongStore = new MahjongStore();

export default mahjongStore;
