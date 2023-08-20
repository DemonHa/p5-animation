import { animate } from "./animation-functions";
import { getTime } from "./utils";
import type {
  AnimationProps,
  PlayAnimationProps,
  RunTimeAnimationProps,
} from "./types";

const animation = <D extends AnimationProps = {}>(props?: D) => {
  const { animation, duration, delay } = props ?? {};

  let inProgress: boolean = false;
  let lastFrameTimestamp: number;
  let timePassed: number;
  let startingPoint: number;
  let endingPoint: number;

  let runTime: RunTimeAnimationProps;

  return {
    inProgress: () => {
      return inProgress;
    },
    play: ({
      from,
      to,
      duration: newDuration,
      animation: newAnimation,
      delay: newDelay,
    }: PlayAnimationProps<D>) => {
      inProgress = true;
      lastFrameTimestamp = getTime();
      timePassed = 0;
      startingPoint = from;
      endingPoint = to;

      runTime = {
        animation: newAnimation ?? animation,
        duration: newDuration ?? duration,
        delay: newDelay ?? delay,
      };

      // Don't set the animation as completed here, since we don't want the
      // user to have inconsistent result because of the frame rate
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, runTime.duration + (runTime.delay ?? 0));
      });
    },
    progress: (defaultValue: number) => {
      if (!inProgress) {
        return defaultValue;
      }
      const timestamp = getTime();
      timePassed += timestamp - lastFrameTimestamp;
      lastFrameTimestamp = timestamp;

      if (timePassed - (runTime.delay ?? 0) >= runTime.duration) {
        inProgress = false;
      }

      return animate(
        timePassed - (runTime.delay ?? 0),
        startingPoint,
        endingPoint,
        runTime.duration,
        runTime.animation
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
