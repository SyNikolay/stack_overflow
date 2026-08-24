export const moveItem = <T>(
  items: readonly T[],
  from: number,
  to: number,
): T[] => {
  const result = [...items];

  if (
    !isIndexInRange(result, from) ||
    !isIndexInRange(result, to) ||
    from === to
  ) {
    return result;
  }

  const [moved] = result.splice(from, 1);

  result.splice(to, 0, moved as T);

  return result;
};

export const swapItems = <T>(
  items: readonly T[],
  first: number,
  second: number,
): T[] => {
  const result = [...items];

  if (
    !isIndexInRange(result, first) ||
    !isIndexInRange(result, second) ||
    first === second
  ) {
    return result;
  }

  const firstItem = result[first] as T;

  result[first] = result[second] as T;
  result[second] = firstItem;

  return result;
};

const isIndexInRange = (items: readonly unknown[], index: number): boolean =>
  Number.isInteger(index) && index >= 0 && index < items.length;
