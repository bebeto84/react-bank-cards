export const addOrRemoveItem = <T extends string>(
  collection: T[],
  item: T,
  add?: boolean
): T[] => {
  return add
    ? [...new Set([...collection, item])]
    : [...collection.filter((current) => current !== item)];
};