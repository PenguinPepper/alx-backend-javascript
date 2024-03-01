const fs = require('fs').promises;
const { parse } = require('csv-parse');

async function countStudents(path) {
  let data;
  try {
    data = await fs.readFile(path);
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  return new Promise((resolve, reject) => {
    const students = [];
    const fields = {};

    parse(data, {
      delimter: ',', columns: true, relax_column_count: true, skip_empty_lines: true,
    })
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
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

module.exports = countStudents;
