export const isPrimitiveEthAddress = (address: string) =>
  /^(0x){1}[0-9a-fA-F]{40}$/i.test(address)

export function truncateMiddle(
  str: string,
  [takeLength, tailLength] = [6, 4],
  pad = '...'
): string {
  if (takeLength + tailLength >= str.length) return str
  return `${str.slice(0, takeLength)}${pad}${str.slice(-tailLength)}`
}
