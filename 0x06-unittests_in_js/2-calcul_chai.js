/*
 * calculateNumber. Accepts 3 arguments type(string) and 2 arguments (number) a and b.
 * rounds a and b and then if type is:
 * SUM - returns the sum of it.
 * SUBTRACT - subtract b from a and return that.
 * DIVIDE - divide a with b
 */

function calculateNumber(type, a, b) {
  const num1 = Math.round(a);
  const num2 = Math.round(b);

  if (type === 'SUM') {
    return(num1 + num2);
  }
  else if (type === 'SUBTRACT') {
    return(num1 - num2);
  }
  else if (type === 'DIVIDE') {
    if (num2 === 0) {
      return('Error');
    }
    return(num1 / num2);
  }
}

module.exports = calculateNumber;
