import {
  createMachine,
  immediate,
  reduce,
  state,
  transition,
  invoke,
} from "robot3";

import { updateRank } from "./api";

export const EVENT = {
  SETUP: "setup",
  START: "start",
  WIN: "win",
  LOSE: "lose",
  RESET: "reset",
  SAVE: "save",
};

type Context = {
  timeSpent: number;
  playerName: string;
  error: Error | null;
};

const saveRankMachine = createMachine(
  {
    saving: invoke(
      save,
      transition("done", "saved"),
      transition(
        "error",
        "failed",
        reduce<Context, { error: Error }>((ctx, ev) => ({
          ...ctx,
          error: ev.error,
        }))
      )
    ),
    saved: state(),
    failed: state(),
  },
  (context: Context) => context
);

const context = () => ({
  timeSpent: 0,
  playerName: "",
  error: null,
});

export async function save(ctx: Context) {
  const rank = { name: ctx.playerName, time_spent: ctx.timeSpent };
  return updateRank({ rank });
}

export const machine = createMachine(
  {
    idle: state(immediate("setup")),
    setup: state(
      transition(
        EVENT.START,
        "start",
        reduce<Context, { playerName: string }>((ctx, ev) => ({
          ...ctx,
          playerName: ev.playerName,
        }))
      )
    ),
    start: state(transition(EVENT.WIN, "win"), transition(EVENT.LOSE, "lose")),
    win: state(
      transition(
        EVENT.SAVE,
        "save",
        reduce<Context, { timeSpent: number }>((ctx, ev) => ({
          ...ctx,
          timeSpent: ev.timeSpent,
        }))
      )
    ),
    lose: state(transition(EVENT.RESET, "idle", reduce(context))),
    save: invoke(
      saveRankMachine,
      transition(
        "done",
        "finish",
        reduce<Context, { data: Context }>((ctx, ev) => ({
          ...ctx,
          error: ev.data.error,
        }))
      )
    ),
    finish: state(transition(EVENT.RESET, "idle", reduce(context))),
  },
  context
);
