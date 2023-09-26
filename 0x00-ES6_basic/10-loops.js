export default function appendToEachArrayValue(array, appendString) {
  const array1 = [];

  for (const idx of array) {
    const value = idx;
    array1.push(appendString + value);
  }
  return array1;
}
