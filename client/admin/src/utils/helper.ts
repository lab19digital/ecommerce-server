export function cleanupData(data: any) {
  const omitTypename = (key: string, value: string) =>
    key === "__typename" ? undefined : value;
  const newPayload = JSON.parse(JSON.stringify(data), omitTypename);

  return newPayload;
}
