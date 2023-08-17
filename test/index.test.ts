import animation, { ease, easeInOutQuad } from "./../src";
import * as animationFunctions from "./../src/animation-functions";

const spykAnimate = jest.spyOn(animationFunctions, "animate");

describe("animation()", () => {
  afterEach(() => {
    spykAnimate.mockClear();
  });

  it("should return default value when animation is not in progress", () => {
    const { progress } = animation({ duration: 500, animation: ease });

    expect(progress(-1)).toBe(-1);
  });

  it("expect the animation to return ending value when the animation finshes", async () => {
    const { progress, play } = animation({
      duration: 500,
      animation: ease,
    });
    await play({ from: 0, to: 100 });
    const result = progress(0);
    expect(result).toBe(100);
  });

  it("should return default value when animation is finish", async () => {
    const { progress, play, inProgress } = animation({
      duration: 500,
      animation: ease,
    });
    await play({ from: 0, to: 100 });
    progress(0);
    expect(inProgress()).toBe(false);
    expect(progress(-1)).toBe(-1);
  });

  it("should call animate with correct values", async () => {
    const { progress, play } = animation({
      duration: 500,
      animation: ease,
    });
    play({ from: 0, to: 100 });
    progress(0);
    progress(0);
    progress(0);

    expect(spykAnimate.mock.calls.length).toBe(3);

    expect(spykAnimate.mock.calls[0][0]).toBeGreaterThanOrEqual(0);
    expect(spykAnimate.mock.calls[0][0]).toBeLessThan(500);

    expect(spykAnimate.mock.calls[0][1]).toBe(0);
    expect(spykAnimate.mock.calls[0][2]).toBe(100);

    expect(spykAnimate.mock.calls[0][3]).toBe(500);
  });

  it("should override animation function and duration when provided on animation start", () => {
    const { play, progress } = animation({ animation: ease, duration: 100 });

    play({ from: 0, to: 100, duration: 500, animation: easeInOutQuad });
    progress(0);

    expect(spykAnimate.mock.calls.length).toBe(1);
    expect(spykAnimate.mock.calls[0][3]).toBe(500);
    expect(spykAnimate.mock.calls[0][4]).toBe(easeInOutQuad);
  });

  describe("types", () => {
    describe("no general properties", () => {
      it("user should be able to leave out properties", () => {
        // @ts-expect-no-error
        animation({});
      });

      it("should throw when user do not provide thouse properties when animation starts", () => {
        const { play } = animation({});

        // @ts-expect-error
        play({ from: 0, to: 100 });
      });
    });

    describe("with general properties", () => {
      it("should be able to provide general properties", () => {
        // @ts-expect-no-error
        animation({ animation: ease, duration: 100 });
      });

      it("should be able to leave out specific properties when playing animation", () => {
        const { play } = animation({ animation: ease, duration: 100 });

        // @ts-expect-no-error
        play({ from: 0, to: 100 });
      });
    });
  });
});
