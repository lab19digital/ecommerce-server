const formatter: any = {
  id: link,
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
  categories: categories,
  // dimensions: todo,
  // weight: todo,
  // images: todo,
  // featured_image: todo,
  // tags: todo,
  // fixedPrices: todo,
};

function categories(data: []): string {
  return data
    .map((each: { title: string }) => {
      return each.title;
    })
    .join(";");
}

function link(contents: [], data: { url: string }): string | [] {
  if (data.url) return data.url + "/" + contents;

  return contents;
}

export function checkIfArray(value: any): Boolean {
  return Array.isArray(value);
}

export function checkIfObject(value: any): Boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * Takes and array of objects and reduces it to a string value
 * */
export function formatArray(arr: []): String {
  const returnVals = arr
    .map((currentObject) => {
      return Object.values(currentObject);
    })
    .join("; ");
  return returnVals;
}

/**
 * Takes an object and reduces it to a string value
 * */
export function formatObject(obj: {}): String {
  return Object.values(obj).join("; ");
}

export function transform(
  element: {} | [] | String,
  data: { column: string; url: string }
): String | {} {
  // check if the formatter object higher up has a function to format the key (which corresponds to column)
  const keysFormatter: string[] = Object.keys(formatter);
  const key: any = keysFormatter.filter(function (val) {
    return data.column.indexOf(val) != -1;
  });
  if (key.length > 0) {
    return formatter[key](element, data);
  }

  if (Array.isArray(element)) {
    return formatArray(element);
  } else if (checkIfObject(element)) {
    return formatObject(element);
  } else {
    return element;
  }
}
