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
  const fields = {};
  parse(data, { delimiter: ',', columns: true })
    .on('data', (row) => {
      students.push(row);
      if (!fields[row.field]) {
        fields[row.field] = [];
      }
      fields[row.field].push(row.firstname);
    })
    .on('end', () => {
      console.log(`Number of students: ${students.length}`);
      for (const field in fields) {
        if (field) {
          console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
        }
      }
    });
}

module.exports = countStudents;
