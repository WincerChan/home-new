
export function adjustColor(color, amount) {
  const colorInt = parseInt(color.slice(1), 16);
  const r = (colorInt >> 16) + amount;
  const g = ((colorInt >> 8) & 0x00FF) + amount;
  const b = (colorInt & 0x0000FF) + amount;

  return '#' + (
    ((clamp(r) << 16) | (clamp(g) << 8) | clamp(b))
      .toString(16)
      .padStart(6, '0')
  ) + '19';
}

function clamp(value, min = 0, max = 255) {
  return Math.min(Math.max(value, min), max);
}
