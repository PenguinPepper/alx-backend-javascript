const fs = require('fs').promises;
const { parse } = require('csv-parse');
const http = require('http');

const hostname = '127.0.0.1';
const port = 1245;
const filePath = process.argv[2];

const database = async function countStudents(path) {
  let data;
  try {
    data = await fs.readFile(path);
  } catch (err) {
    throw new Error(`Cannot load the database at:${path}`);
  }

  return new Promise((resolve, reject) => {
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
};

const greeting = 'Hello Holberton School!';

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text-plain');
  switch (req.url) {
    case '/':
      res.writeHead(200);
      res.end(greeting);
      break;
    case '/students':
      try {
        const answer = await database(filePath);
        res.writeHead(200);
        res.end(`This is the list of our students\n${answer}`);
      } catch (error) {
        console.log(error);
        res.writeHead(500);
        res.end('Mhhh and error occured');
      }
      break;
    default:
      res.writeHead(200);
      res.end(greeting);
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
