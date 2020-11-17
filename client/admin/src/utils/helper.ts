import { transform } from "@/utils/formatter";

/**
 * Removes __typename from incoming data.
 * @constructor
 * @param {array} data - Incoming data.
 */
export function cleanupData(data: any) {
  const omitTypename = (key: string, value: string) =>
    key === "__typename" ? undefined : value;
  const newPayload = JSON.parse(JSON.stringify(data), omitTypename);

  return newPayload;
}

/**
 * There is an original array (originalArray) and another array (mutatedArray) , the originalArray array will never be
 * changed, only the selected values from the settings panel will be used to filter data from the original originalArray array
 * back into the mutatedArray array and then appear in the ui to the user.
 *
 * The originalArray array will keep all the data from graphql query that returns the element attributes. The mutatedArray will change
 * each time the user selects more columns or removes columns from the setttings tab. Each column value is a property in the poduct
 * object. So for each element object in the originalArray array we filter out only the desired keys from the objects and clone them
 * into the mutatedArray array.
 *
 * @constructor
 * @param {array} tableColums - The array of table columns.
 * @param {array} originalArray - The original incoming array.
 * @param {array} mutatedArray - The mutated array.
 */
export function filterArray(
  tableColums: any,
  originalArray: any[],
  data: { url: string } = { url: "" }
): any[] {
  const mutatedArray = originalArray.map(function (element: any) {
    return Object.keys(element)
      .filter((k) => tableColums.includes(k))
      .map((k: any) =>
        Object.assign(
          {},
          { [k]: transform(element[k], { column: k, url: data.url }) }
        )
      )
      .reduce((res, o) => Object.assign(res, o), {});
  });

  return mutatedArray;
}
