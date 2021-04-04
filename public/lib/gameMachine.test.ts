import { interpret, Machine, Service } from "robot3";
import { machine, save } from "./gameMachine";
import * as api from "./api";

jest.mock("./api", () => ({
  updateRank: jest.fn(() => Promise.resolve()),
}));

const service = interpret(machine, () => {});

it('sets "setup" as an initial state', () => {
  expect(service.machine.current).toBe("setup");
});

it('transition to "start" state from "setup" state and sets a player name', () => {
  service.send({ type: "start", playerName: "Eren Yeager" });
  expect(service.machine.current).toBe("start");
  expect(service.context).toMatchObject({ playerName: "Eren Yeager" });
});

it('transition to "win" state from "start" state', () => {
  service.send({ type: "win" });
  expect(service.machine.current).toBe("win");
});

it('transition to "save" state from "win" state and save time spent then calls update rank endpoint', async () => {
  service.send({ type: "save", timeSpent: 10 });
  expect(service.machine.current).toBe("save");
  expect(service.context).toMatchObject({ timeSpent: 10 });
  expect(
    (service as typeof service & { child: Service<Machine> }).child.machine
      .current
  ).toBe("saving");

  expect(api.updateRank).toHaveBeenCalledTimes(1);
  expect(api.updateRank).toHaveBeenCalledWith({
    rank: { name: "Eren Yeager", time_spent: 10 },
  });

  await save(service.context as any);
  expect(service.machine.current).toEqual("finish");
});

it('transition to "setup" from "finish" state', () => {
  service.send({ type: "reset" });
  expect(service.machine.current).toBe("setup");
  expect(service.context).toEqual({
    timeSpent: 0,
    playerName: "",
    error: null,
  });
});
