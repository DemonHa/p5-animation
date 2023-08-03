import {
  animate,
  ease,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInOutQuint,
} from "./animation-functions";
import { getTime } from "./utils";

type AnimationProps = {
  duration: number;
  animation: (input: number) => number;
};

type PlayAnimationProp = {
  from: number;
  to: number;
};

const animation = ({ animation, duration }: AnimationProps) => {
  let inProgress: boolean = false;
  let lastFrameTimestamp: number;
  let timePassed: number;
  let startingPoint: number;
  let endingPoint: number;

  return {
    inProgress: () => {
      return inProgress;
    },
    play: ({ from, to }: PlayAnimationProp) => {
      inProgress = true;
      lastFrameTimestamp = getTime();
      timePassed = 0;
      startingPoint = from;
      endingPoint = to;

      return new Promise((resolve) => {
        setTimeout(() => resolve(null), duration);
      });
    },
    progress: (defaultValue: number) => {
      if (!inProgress) {
        return defaultValue;
      }
      const timestamp = getTime();
      timePassed += timestamp - lastFrameTimestamp;
      lastFrameTimestamp = timestamp;

      if (timePassed > duration) {
        inProgress = false;
      }

      return animate(
        timePassed,
        startingPoint,
        endingPoint,
        duration,
        animation
      );
    },
  };
};

export default animation;
export {
  ease,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInOutQuint,
};