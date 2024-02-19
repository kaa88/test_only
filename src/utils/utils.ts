export const getFormattedNumber = (value: number): string => {
  let result = value.toString();
  return result.length === 1 ? "0" + result : result;
};
