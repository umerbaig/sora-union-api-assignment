
export function customDescendingSort(a, b) {
    const matchA = a['value'].match(/\d+/);
    const matchB = b['value'].match(/\d+/);

    // Check if matches exist before accessing the first element
    if (matchA && matchB) {
      const numericPartA = parseInt(matchA[0]);
      const numericPartB = parseInt(matchB[0]);

      if (numericPartA > numericPartB) {
        return -1;
      } else if (numericPartA < numericPartB) {
        return 1;
      } else {
        return a['value'].localeCompare(b['value']);
      }
    } else {
      // Handle cases where there are no numeric parts to compare
      return a['value'].localeCompare(b['value']);
    }
}