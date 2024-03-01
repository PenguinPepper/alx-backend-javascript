const fs = require('fs').promises;
const { parse } = require('csv-parse');
const http = require('http');

const hostname = '127.0.0.1';
const port = 1245;

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

const app = http.createServer(async (request, response) => {
  response.setHeader('Content-Type', 'text/plain');
  switch (request.url) {
    case '/':
      response.statusCode = 200;
      response.end('Hello Holberton School!');
      break;
    case '/students':
      try {
        const students = await countStudents(process.argv[2]);
        response.statusCode = 200;
        response.end(`This is the list of our students\n${students}`);
      } catch (error) {
        console.log(error);
        response.statusCode = 503;
        response.end('Cannot load the database');
      }
      break;
    default:
      response.statusCode = 200;
      response.end('Hello Holberton School!');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at ${hostname} on port: ${port}`);
});

module.exports = app;
