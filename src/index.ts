import { animate } from "./animation-functions";
import { getTime } from "./utils";
import type { RequireKeys, AnimationProps, PlayAnimationProp } from "./types";

const animation = <D extends AnimationProps>({ animation, duration }: D) => {
  let inProgress: boolean = false;
  let lastFrameTimestamp: number;
  let timePassed: number;
  let startingPoint: number;
  let endingPoint: number;

  let runTime = {
    duration,
    animation,
  };

  return {
    inProgress: () => {
      return inProgress;
    },
    play: ({
      from,
      to,
      duration: newDuration,
      animation: newAnimation,
    }: RequireKeys<AnimationProps, keyof Omit<AnimationProps, keyof D>> &
      PlayAnimationProp) => {
      inProgress = true;
      lastFrameTimestamp = getTime();
      timePassed = 0;
      startingPoint = from;
      endingPoint = to;

      runTime.animation = newAnimation ?? animation;
      runTime.duration = newDuration ?? duration;

      // Don't set the animation as completed here, since we don't want the
      // user to have inconsistent result because of the frame rate
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, runTime.duration);
      });
    },
    progress: (defaultValue: number) => {
      if (!inProgress) {
        return defaultValue;
      }
      const timestamp = getTime();
      timePassed += timestamp - lastFrameTimestamp;
      lastFrameTimestamp = timestamp;

      if (timePassed >= runTime.duration!) {
        inProgress = false;
      }

      return animate(
        timePassed,
        startingPoint,
        endingPoint,
        runTime.duration!,
        runTime.animation!
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
} from "./animation-functions";
