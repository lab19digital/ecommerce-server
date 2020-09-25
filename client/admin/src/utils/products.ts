const formatter: any = {
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
  categories: categories,
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

function categories(data: any): string {
  return data
    .map((each: any) => {
      return each.title;
    })
    .join(",");
}

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
      // check if the formatter object higher up has a function to format the key (which corresponds to column)
      // Otherwise just return value of object in coming
      try {
        const keysIncoming: string[] = Object.keys(each);
        const keysFormatter: string[] = Object.keys(formatter);

        const key: any = keysFormatter.filter(function (val) {
          return keysIncoming.indexOf(val) != -1;
        });

        if (key.length > 0) {
          return formatter[key](each);
        }
      } catch (error) {
        console.log(error);
      }

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
