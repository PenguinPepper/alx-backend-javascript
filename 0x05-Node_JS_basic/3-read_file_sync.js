import { readFile } from 'fs';
import { parse } from 'csv-parse';

function countStudents(path) {
  let data;
  try {
    data = readFile(path);
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  const students = [];
  const fields = {};

  parse(data, { delimter: ',', columns: true })
    .on('data', (row) => {
      students.push(row);
      if (!fields[row.field]) {
        fields[row.field] = [];
      }
      fields[row.field].push(row.student);
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

export default countStudents;
