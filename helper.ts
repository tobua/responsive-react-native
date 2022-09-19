export const avoidZero = (value: number, input: number) => {
  if (input >= 0) {
    return Math.max(1, value)
  } else {
    return Math.min(-1, value)
  }
}
