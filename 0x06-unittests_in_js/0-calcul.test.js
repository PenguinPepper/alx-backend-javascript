const assert = require('assert');
const calculateNumber = require("./0-calcul.js");

describe('Test rounding off', function() {
  it('calculateNumber', function() {
    answer = 1 + Math.round(3.7);
    func_ans = calculateNumber(1, 3.7);
    assert.deepStrictEqual(answer, func_ans);
  });

  it('Round off of 1 number', function() {
    answer = Math.round(4.2) + 3;
    func_ans = calculateNumber(4.2, 3);
    assert.deepStrictEqual(answer, func_ans);
  });

  it('Round off two decimals', function() {
    answer = 2 + 4;
    func_ans = calculateNumber(1.5, 3.7);
    assert.deepStrictEqual(answer, func_ans);
  });

  it('Round off a negative decimal number', function() {
    answer = -1 + 2;
    func_ans = calculateNumber(-1.5, 2.1);
    assert.deepStrictEqual(answer, func_ans);
  });

  it('Round off two negative decimal numbers', function() {
    answer = -3 + (-3);
    func_ans = calculateNumber(-3.2, -2.7);
    assert.deepStrictEqual(answer, func_ans);
  });

  it('Round off two whole numbers', function() {
    answer = 2 + 6;
    func_ans = calculateNumber(2, 6);
    assert.deepStrictEqual(answer, func_ans);
  });
})
