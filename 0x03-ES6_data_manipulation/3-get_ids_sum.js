export default function getStudentIdsSum(arr) {
  const sum = arr.reduce((accumulator, items) => accumulator + items.id, 0);
  return sum;
}
