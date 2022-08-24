export default function toPath(path) {
  if (!path)
    return [];
  if (typeof path === 'string')
    return path.split('.');
  return path;
}
