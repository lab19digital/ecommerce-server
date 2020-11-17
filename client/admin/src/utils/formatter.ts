/**
 * This is a mapping object from a function to an object property.
 * It is used for product objects attributes to be formatted in specific way.
 * @constructor
 */
const formatter: any = {
  id: link,
  categories: categories,
};

/**
 * Concatenates an array of category objects into a string.
 * @constructor
 * @param {array} data - The array of category objects.
 */
function categories(data: []): string {
  return data
    .map((each: { title: string }) => {
      return each.title;
    })
    .join(";");
}

/**
 * Creates an innerHTML link to display in a html table.
 * @constructor
 * @param {array} contents - The id to append to end of url.
 * @param {object} data - The incoming url to modify.
 */
function link(contents: [], data: { url: string }): string | [] {
  const url = data.url + "/" + contents;
  if (data.url)
    return (
      `<a class="text-teal-500 underline" href="${url}" target="_blank">` +
      contents +
      "</a>"
    );

  return contents;
}

/**
 * Checks if the incoming data is an array.
 * @constructor
 * @param {any} value - Data structure.
 */
export function checkIfArray(value: any): Boolean {
  return Array.isArray(value);
}

/**
 * Checks if the incoming data is an object.
 * @constructor
 * @param {any} value - Data structure.
 */
export function checkIfObject(value: any): Boolean {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

/**
 * Takes and array of objects and reduces it to a string value.
 * @constructor
 * @param {array} arr - Array.
 */
export function formatArray(arr: []): String {
  const returnVals = arr
    .map((currentObject) => {
      return Object.values(currentObject);
    })
    .join("; ");
  return returnVals;
}

/**
 * Takes an object and reduces it to a string value.
 * @constructor
 * @param {object} obj - Object.
 */
export function formatObject(obj: {}): String {
  return Object.values(obj).join("; ");
}

/**
 * Transform is used to take in data from a component and then transform it in a way to display.
 * Like innerHTML for a link example. It also checks if the formatter object has a function associated
 * with the key and will use that function if it exists.
 * @constructor
 * @param {object} obj - Object.
 */
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
