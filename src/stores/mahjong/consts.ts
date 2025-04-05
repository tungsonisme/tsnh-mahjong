export const PASS_CODE = "1514";

export enum MahjongStep {
  LOCK_SCREEN,
  SETUP_PLAYERS,
  PLAY,
  CALCULATE_POINTS,
  SHOW_POINTS,
}

export enum WinType {
  STEAL = "Cướp để ù",
  SELF_DRAW = "Tự bốc để ù (+1 phán)",
  SELF_DRAW_LAST_CARD = "Tự bốc quân cuối cùng để ù (+ 2 phán)",
}

export enum SpecialHandLevel1 {
  IS_ALL_PONG = "Toàn Phỗng (+3 phán)",
  IS_ALL_SAME_SUIT = "Tất cả cùng loại (+ 6 phán)",
}

export enum SpecialHandLevel2 {
  HAS_2_DRAGON_PONG_AND_1_DRAGON_PAIR = "Có 2 Phỗng Rồng + 1 đôi Rồng (+ 3 phán)",
  HAS_3_DRAGON_PONG = "Có 3 Phỗng Rồng (+ 6 phán)",
  HAS_3_WIND_PONG_AND_1_WIND_PAIR = "Có 3 Phỗng Gió + 1 đôi Gió (+ 6 phán)",
  HAS_4_WIND_PONG = "Có 4 Phỗng Gió (+ 8 phán)",
}

export enum HasFlower {
  YES = "Có hoa",
  NO = "Không có hoa nào (+1 phán)",
}
