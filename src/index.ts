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

type Pretty<T extends {}> = {
  [I in keyof T]: T[I];
};

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K> extends infer O
  ? O extends {}
    ? Pretty<O>
    : never
  : never;

type AnimationProps = {
  duration?: number;
  animation?: (input: number) => number;
};

type PlayAnimationProp = {
  from: number;
  to: number;
};

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
        runTime.duration = duration;
        runTime.animation = animation;
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
};
