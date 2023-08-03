import { map } from "./../src/utils"; // Replace 'your-file-name' with the actual file name containing the function.

describe("mapValueInRange", () => {
  it("should map a value from one range to another range", () => {
    expect(map(50, 0, 100, 0, 1)).toBe(0.5);
  });

  it("should map a value to the minimum value of the new range when the value is at the start of the original range", () => {
    expect(map(0, 0, 100, -1, 1)).toBe(-1);
  });

  it("should map a value to the maximum value of the new range when the value is at the end of the original range", () => {
    expect(map(100, 0, 100, -1, 1)).toBe(1);
  });

  it("should handle values outside the original range and map them to the closest value in the new range", () => {
    expect(map(-50, 0, 100, 0, 1)).toBe(0);
    expect(map(150, 0, 100, 0, 1)).toBe(1);
  });
});
