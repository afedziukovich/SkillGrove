export function dynamicSort<T>(property: keyof T, order: 'asc' | 'desc' = 'asc') {
  return (a: T, b: T): number => {
    const valueA = a[property];
    const valueB = b[property];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const comparison = valueA.localeCompare(valueB, undefined, { sensitivity: 'base' });
      return order === 'asc' ? comparison : -comparison;
    }

    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return order === 'asc'
        ? valueA === valueB
          ? 0
          : valueA
            ? 1
            : -1
        : valueA === valueB
          ? 0
          : valueA
            ? -1
            : 1;
    }

    return order === 'asc'
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  };
}
