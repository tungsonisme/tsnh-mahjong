import {
  HasFlower,
  SpecialHandLevel1,
  SpecialHandLevel2,
  WinType,
} from "./consts";

export interface Player {
  name: string;
}

export interface Result {
  winnerName: string;
  winType: WinType;
  victimName?: string;
  isAllSteal?: boolean;
  isAllPongAndSelfWin?: boolean;
  isAllPick?: boolean;
  specialHandLevel1: SpecialHandLevel1;
  specialHandLevel2: SpecialHandLevel2;
  hasAllWindOrDragon?: boolean;
  hasPongOrChowWithSameWind?: boolean;
  hasFlower: HasFlower;
  hasRedFlowerWithSameWind?: boolean;
  hasBlueFlowerWithSameWind?: boolean;
  has4RedFlowers?: boolean;
  has4BlueFlowers?: boolean;
  points?: number;
}
