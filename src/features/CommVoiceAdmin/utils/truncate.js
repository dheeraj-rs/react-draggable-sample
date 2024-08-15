export default function truncate(str, maxLength) {
  return str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;
}
