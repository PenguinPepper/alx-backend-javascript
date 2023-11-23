const assert = require('assert');
const calculateNumber = require("./0-calcul.js");

describe('Test rounding off', function() {
  it('calculateNumber', function(){
    answer = 1 + Math.round(3.7);
    func_ans = calculateNumber(1, 3.7);
    assert.deepStrictEqual(answer, func_ans);
  })
})
