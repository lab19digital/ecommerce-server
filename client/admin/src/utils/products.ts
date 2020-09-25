const formatter = {
  // categories: csv,
  // images: gallery,
  // dimensions: csv,
  // title: link,
};

// function link( columnName: string, rowData: Row ){
//   return `/products/${rowData.id}`
// }

export function checkIfArray(value: number): Boolean {
  return Array.isArray(value);
}

export function checkIfObject(value: number): Boolean {
  return typeof value === "object" && value !== null;
}

/**
 * Takes and array of objects and reduces it to a string value
 * */
export function formatArray(arr: []): String {
  const returnVals = arr
    .map((each) => {
      return Object.values(each);
    })
    .join("; ");
  return returnVals;
}

/**
 * Takes an object and reduces it to a string value
 * */
export function formatObject(arr: []): String {
  return Object.values(arr).join("; ");
}

export function transform(prodElement: any): String {
  if (checkIfArray(prodElement)) {
    prodElement = formatArray(prodElement);
  }
  if (checkIfObject(prodElement)) {
    prodElement = formatObject(prodElement);
  }

  return prodElement;
}
