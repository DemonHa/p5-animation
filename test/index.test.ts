import animation, { ease } from "./../src";
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
});
