import { createMachine, immediate, reduce, state, transition } from "robot3";

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
};

const context = () => ({
  timeSpent: 0,
  playerName: "",
});

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
    save: state(transition(EVENT.RESET, "idle", reduce(context))),
  },
  context
);
