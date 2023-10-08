export default function getListStudentIds(arr) {
  if (!Array.isArray(arr)) return [];
  const newArray = arr.map((items) => (items.id));
  return newArray;
}
