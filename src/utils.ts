function map(
  value: number,
  fromRangeStart: number,
  fromRangeEnd: number,
  toRangeStart: number,
  toRangeEnd: number
): number {
  // Ensure the value is within the original range
  const clampedValue = Math.min(Math.max(value, fromRangeStart), fromRangeEnd);

  // Calculate the percentage of the value in the original range
  const percentage =
    (clampedValue - fromRangeStart) / (fromRangeEnd - fromRangeStart);

  // Map the percentage to the new range
  const mappedValue = toRangeStart + percentage * (toRangeEnd - toRangeStart);

  return mappedValue;
}

function getTime(): number {
  return new Date().getTime();
}

export { map, getTime };
