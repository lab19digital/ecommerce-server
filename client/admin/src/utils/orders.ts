const formatter: any = {};

function categories(data: []): string {
  return data
    .map((each: { title: string }) => {
      return each.title;
    })
    .join(",");
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
      // check if the formatter object higher up has a function to format the key (which corresponds to column)
      // Otherwise just return value of object in coming
      try {
        const keysIncoming: string[] = Object.keys(currentObject);
        const keysFormatter: string[] = Object.keys(formatter);

        const key: any = keysFormatter.filter(function (val) {
          return keysIncoming.indexOf(val) != -1;
        });

        if (key.length > 0) {
          return formatter[key](currentObject);
        }
      } catch (error) {
        console.log(error);
      }

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

export function transform(prodElement: {} | [] | String): String | {} {
  if (Array.isArray(prodElement)) {
    return formatArray(prodElement);
  } else if (checkIfObject(prodElement)) {
    return formatObject(prodElement);
  } else {
    return prodElement;
  }
}
