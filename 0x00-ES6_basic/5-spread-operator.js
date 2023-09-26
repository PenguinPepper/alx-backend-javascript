export default function concatArrays(array1, array2, string) {
  let array3 = [];
  array3 = array3.concat(...array1, ...array2, ...string);
  return array3;
}
