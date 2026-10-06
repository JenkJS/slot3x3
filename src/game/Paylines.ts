export function isWinningLine(line: string[]) {
  if (line.length === 0) {
    return false
  }

  return line.every((symbol) => symbol === line[0])
}