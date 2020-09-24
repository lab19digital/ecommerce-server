export function checkIfArray(value: number): Boolean {
  return Array.isArray(value);
}

export function checkIfObject(value: number): Boolean {
  return typeof value === "object" && value !== null;
}

export function formatArray(arr: []): String {
  const returnVals = arr
    .map((each) => {
      return Object.values(each);
    })
    .join("; ");
  return returnVals;
}
