import { Vector } from "$types/typeCollection";

const INITIAL_INTERVAL = 300;
const SPAWN_LOCATION = [-3, 4] as Vector;
const DEFAULT_SPEEDUP_FACTOR = 1;
const ARROW_DOWN_SPEEDUP_FACTOR = 6;
const MIN_INTERVAL = 30;
const BLOCK_COLORS_MAP = {
  0: "none",
  1: "rgba(255,0,0,1) 0%, rgba(250,142,0,1) 47%, rgba(227,152,0,1) 88%",
  2: "rgba(52,233,0,1) 0%, rgba(0,250,155,1) 47%, rgba(40,170,204,1) 88%",
  3: "rgba(0,233,172,1) 0%, rgba(0,219,250,1) 47%, rgba(40,118,204,1) 88%",
  4: "rgba(0,193,233,1) 0%, rgba(0,131,250,1) 47%, rgba(40,79,204,1) 88%",
  5: "rgba(0,59,233,1) 0%, rgba(121,0,250,1) 47%, rgba(139,40,204,1) 88%",
  6: "rgba(85,0,233,1) 0%, rgba(222,0,250,1) 47%, rgba(204,40,167,1) 88%",
  7: "rgba(255,162,0,1) 0%, rgba(250,213,0,1) 47%, rgba(186,250,3,1) 88%",
} as const;
const DB_NUM_HIGH_SCORES = 10;
const MOBILE_WIDTH = 1024;

export {
  INITIAL_INTERVAL,
  SPAWN_LOCATION,
  DEFAULT_SPEEDUP_FACTOR,
  ARROW_DOWN_SPEEDUP_FACTOR,
  MIN_INTERVAL,
  BLOCK_COLORS_MAP,
  DB_NUM_HIGH_SCORES,
  MOBILE_WIDTH,
};
