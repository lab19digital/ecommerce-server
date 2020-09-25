const formatter = {
  // id: link,
  // title: todo,
  // status: todo,
  // published: todo,
  // price_cents: todo,
  // price_currency: todo,
  // short_description: todo,
  // long_description: todo,
  // created_at: todo,
  // updated_at: todo,
  // meta: todo,
  // prices: todo,
  // sizes: todo,
  // variants: todo,
  // categories: todo,
  // dimensions: todo,
  // weight: todo,
  // images: todo,
  // featured_image: todo,
  // tags: todo,
  // fixedPrices: todo,
};

// function link(rowData: any) {
//   return `/products/${rowData.id}`;
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
