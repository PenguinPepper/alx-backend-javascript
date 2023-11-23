/*
 * calculateNumber. Accepts two arguments (number) a and b.
 * rounds a and b and returns the sum of it.
 */

function calculateNumber(a, b) {
  const num1 = Math.round(a);
  const num2 = Math.round(b);

  return(num1 + num2);
}

module.exports = calculateNumber;
