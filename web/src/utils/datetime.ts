export function GetCurrentTime() {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes()}`;
}
