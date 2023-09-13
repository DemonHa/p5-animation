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

function easeInCubic(x: number): number {
  return x * x * x;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInQuint(x: number): number {
  return x * x * x * x * x;
}

function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

function easeInOutQuint(x: number): number {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

function easeInCirc(x: number): number {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function easeInOutCirc(x: number): number {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
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

function easeInQuart(x: number): number {
  return x * x * x * x;
}

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

function easeInOutQuart(x: number): number {
  return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

function easeInOutExpo(x: number): number {
  return x === 0
    ? 0
    : x === 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export {
  animate,
  ease,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuint,
  easeOutQuint,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInOutQuint,
  easeInCirc,
  easeOutCirc,
  easeInOutCirc,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInExpo,
  easeOutExpo,
  easeInOutExpo,
};
