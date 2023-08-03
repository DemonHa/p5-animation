import { map } from "./utils";

/**
 * Get animation value for the given time
 */
function animate(
  t: number,
  x1: number,
  x2: number,
  tt: number,
  fn: (input: number) => number
) {
  return map(fn(map(t, 0, tt, 0, 1)), 0, 1, x1, x2);
}

function ease(x: number) {
  return x;
}

function easeInSine(x: number) {
  return 1 - Math.cos((x * Math.PI) / 2);
}

function easeOutSine(x: number) {
  return Math.sin((x * Math.PI) / 2);
}

function easeInOutSine(x: number) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function easeInQuad(x: number) {
  return x * x;
}

function easeOutQuad(x: number) {
  return 1 - (1 - x) * (1 - x);
}

function easeInOutQuad(x: number) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeInOutQuint(x: number) {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

export {
  animate,
  ease,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInOutQuint,
};
