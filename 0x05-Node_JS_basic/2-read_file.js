const fs = require('fs');
const { parse } = require('csv-parse');

function countStudents(path) {
  let data;
  try {
    data = fs.readFileSync(path);
  } catch (err) {
    throw new Error('Cannot load the database');
  }

  const students = [];
  const cs = [];
  const swe = [];
  parse(data, { delimiter: ',', columns: true })
    .on('data', (row) => {
      students.push(row);
      if (row.field === 'CS') {
        cs.push(row.firstname);
      } else if (row.field === 'SWE') {
        swe.push(row.firstname);
      }
    })
    .on('end', () => {
      console.log(`Number of students: ${students.length}`);
      console.log(`Number of students in CS: ${cs.length}. List: ${cs.join(', ')}`);
      console.log(`Number of students in SWE: ${swe.length}. List: ${swe.join(', ')}`);
    });
}

module.exports = countStudents;
