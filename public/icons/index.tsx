import { ComponentChildren } from "preact";

/** Open source SVG from https://openmoji.org/ */

import BearSVG from "./animal/bear";
import DeerSVG from "./animal/deer";
import DogSVG from "./animal/dog";
import FoxSVG from "./animal/fox";
import GorillaSVG from "./animal/gorilla";
import HedgeHogSVG from "./animal/hedgehog";
import LionSVG from "./animal/lion";
import MonkeySVG from "./animal/monkey";
import OrangutanSVG from "./animal/orangutan";
import PandaSVG from "./animal/panda";
import PigSVG from "./animal/pig";
import PolarBearSVG from "./animal/polar_bear";
import SlothSVG from "./animal/sloth";
import TigerSVG from "./animal/tiger";
import UnicornSVG from "./animal/unicorn";
import WolfSVG from "./animal/wolf";

export const animalIcons: { [key: string]: () => ComponentChildren } = {
  bear: BearSVG,
  deer: DeerSVG,
  dog: DogSVG,
  fox: FoxSVG,
  gorilla: GorillaSVG,
  hedgehig: HedgeHogSVG,
  lion: LionSVG,
  monkey: MonkeySVG,
  orangutan: OrangutanSVG,
  panda: PandaSVG,
  pig: PigSVG,
  sloth: SlothSVG,
  polar_bear: PolarBearSVG,
  tiger: TigerSVG,
  unicorn: UnicornSVG,
  wolf: WolfSVG,
};
