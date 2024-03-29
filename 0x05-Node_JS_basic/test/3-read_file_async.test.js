<<<<<<< HEAD
const { expect } = require('chai');
const sinon = require('sinon');

const countStudents = require('../3-read_file_async.js');

describe('countStudents', () => {
    let consoleSpy;

    beforeEach(() => {
        consoleSpy = sinon.spy(console, 'log');
    });

    afterEach(() => {
        consoleSpy.restore();
    });

    it('logs to the console the right messages', (done) => {
        countStudents('./database.csv').then(() => {
            expect(consoleSpy.calledWith('Number of students: 10')).to.be.true;
            expect(consoleSpy.calledWith('Number of students in CS: 6. List: Johenn, Arielle, Jonathen, Emmenuel, Guillaume, Katie')).to.be.true;
            expect(consoleSpy.calledWith('Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy')).to.be.true;

            done();
        });
    });
});
||||||| d46fd81f
=======
const { expect } = require('chai');
const sinon = require('sinon');

const countStudents = require('../3-read_file_async.js');

describe('countStudents', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    consoleSpy.restore();
  });

  it('logs to the console the right messages', (done) => {
    countStudents('./database.csv').then(() => {
      expect(consoleSpy.calledWith('Number of students: 10')).to.be.true;
      expect(consoleSpy.calledWith('Number of students in CS: 6. List: Johann, Arielle, Jonathen, Emmenuel, Guillaume, Katie')).to.be.true;
      expect(consoleSpy.calledWith('Number of students in SWE: 4. List: Guillaume, Joseph, Paul, Tommy')).to.be.true;

      done();
    });
  });
});
>>>>>>> df4457d2f5c492958dd2c1cc68faf531800c5ac1
