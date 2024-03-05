const readPromise = require('fs').promises;
const fs = require('fs');
const readline = require('readline');
const http = require('http');

async function parse(filePath) {

  try {
    await readPromise.access(filePath, fs.constants.F_OK);
  }  catch (error) {
    throw new Error('Cannot load database');
  }

  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];
    return new Promise((resolve, reject) => {
      rl.on('line', (line) => {
        if (line.trim() !== '') {
          lines.push(line.split(',').map((value) => value.trim()));
        }
      });

      rl.on('close', () => {
        const [header, ...rows] = lines;
        const result = [];
        rows.forEach((row) => {
          const obj = {};
          for (let i = 0; i < header.length; i++) {
            obj[header[i]] = row[i];
          }
          result.push(obj);
        });
        resolve(result);
      });

      rl.on('error', (error) => {
        reject(error);
      });
    });
  }

async function countStudents(path) {
  let students;
  try {
    students = await parse(path);
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  return new Promise((resolve, reject) => {
    try {
      const fields = {};

      students.forEach((student) => {
        if (!fields[student.field]) {
          fields[student.field] = [];
        }
        fields[student.field].push(student.firstname);
      });

      let output = `Number of students: ${students.length}`;
      for (const field in fields) {
        if (field) {
          output += `\n Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        }
      }
      resolve(output);
    } catch (error) {
      reject(error);
    }
  });
}


const hostname = '127.0.0.1';
const port = 1245;

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
        response.end(`This is the list of our students\n${error.message}`);
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
