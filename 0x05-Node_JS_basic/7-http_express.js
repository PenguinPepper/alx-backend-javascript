const express = require('express');
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
        let output = `Number of students: ${students.length}`;
        for (const field in fields) {
          if (field) {
            output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
          }
        }
        resolve(output);
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

const app = express();
const port = 1245;

app.get('/', (request, response) => {
  response.set('Content-Type', 'text/plain');
  response.status(200).send('Hello Holberton School!');
});


app.get('/students', async (request, response) => {
  try {
    const students = await countStudents(process.argv[2]);
    response.set('Content-Type', 'text/plain');
    response.status(200).send(`This is the list of our students\n${students}`);
  } catch (error) {
    response.set('Content-Type', 'text/plain');
    response.status(503).send('Únable to open database');
  }
});

app.listen(port, () => {
  console.log(`Serve running on port: ${port}`);
});
