export default function escape(segment) {
  segment = segment ? segment.trim() : '';
  return segment
    .replace(/(["'])/gim, '\\$1')
    .replace(/\r/gim, '\\r')
    .replace(/\n/gim, '\\n');
}
