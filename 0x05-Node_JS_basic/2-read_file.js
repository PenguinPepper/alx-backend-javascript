// Create a function named countStudents. It should accept a path in argument
// The script should attempt to read the database file synchronously
// If the database is not available, it should throw an error with
// the text Cannot load the database
// If the database is available, it should log the following message to
// the console Number of students: NUMBER_OF_STUDENTS
// It should log the number of students in each field, and the list with
// the following format: Number of students in FIELD: 6. List: LIST_OF_FIRSTNAMES
// CSV file can contain empty lines (at the end) - and they are not a valid student!

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
