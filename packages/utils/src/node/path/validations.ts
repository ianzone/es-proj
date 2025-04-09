export function isFullPath(path: string) {
  return path.startsWith('/') || path.at(1) === ':';
}
