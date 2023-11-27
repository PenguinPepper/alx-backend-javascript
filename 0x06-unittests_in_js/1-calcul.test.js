const assert = require('assert');
const calculateNumber = require("./1-calcul.js");

describe('Test 1-calculjs', function() {
  describe('Test rounding', function() {
    it('calculateNumber', function(){
      answer = 1 + Math.round(3.7);
      func_ans = calculateNumber('SUM', 1, 3.7);
      assert.deepStrictEqual(answer, func_ans);
    });

    it('Round off of 1 number', function() {
      answer = 'Error';
      func_ans = calculateNumber('DIVIDE', 4.2, 0);
      assert.deepStrictEqual(answer, func_ans);
    });

    it('Round off two decimals', function() {
      answer = 2 - 4;
      func_ans = calculateNumber('SUBTRACT', 1.5, 3.7);
      assert.deepStrictEqual(answer, func_ans);
    });

    it('Round off a negative decimal number', function() {
      answer = -1 / 2;
      func_ans = calculateNumber('DIVIDE', -1.5, 2.1);
      assert.deepStrictEqual(answer, func_ans);
    });

    it('Round off two negative decimal numbers', function() {
      answer = -3 + (-3);
      func_ans = calculateNumber('SUM', -3.2, -2.7);
      assert.deepStrictEqual(answer, func_ans);
    });

    it('Round off two whole numbers', function() {
      answer = 2 / 6;
      func_ans = calculateNumber('DIVIDE', 2, 6);
      assert.deepStrictEqual(answer, func_ans);
    });
  })

})
