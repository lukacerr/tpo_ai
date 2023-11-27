export function getInitialsWSurname(n?: string | null) {
  return n
    ?.split(' ')
    .map((v, i, arr) => (i === arr.length - 1 ? v : `${v[0]}.`))
    .reverse()
    .join(' ');
}
