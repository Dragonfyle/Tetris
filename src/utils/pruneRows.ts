export function pruneRow(row: boolean[]) {
  if (!row.every((column: boolean) => column)) {
    return row;
  } else {
    return null;
  }
}
