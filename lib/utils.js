export function formatDownloads(count) {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count.toString();
}

export function formatResolution(label) {
  switch (label) {
    case 'HD': return '1080p HD';
    case '4K': return '4K Ultra HD';
    case '8K': return '8K Super HD';
    default: return label;
  }
}
