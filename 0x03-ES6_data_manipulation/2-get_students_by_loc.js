export default function getStudentsByLocation(arr, city) {
  const studentArea = arr.filter((items) => (items.location === city));
  return studentArea;
}
