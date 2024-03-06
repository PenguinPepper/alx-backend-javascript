const fs = require('fs');
const readline = require('readline');
const express = require('express');

async function parse(filePath) {
  try {
    await readPromise.access(filePath, fs.constants.F_OK);
  } catch (error) {
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
        for (let i = 0; i < header.length; i += 1) {
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
          output += `\nNumber of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`;
        }
      }
      resolve(output);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

const app = express();
const port = 1245;

app.get('/', (request, response) => {
  response.status(200).type('text').send('Hello Holberton School!');
});

app.get('/students', async (request, response) => {
  try {
    const students = await countStudents(process.argv[2]);
    response.status(200).type('text').send(`This is the list of our students\n${students}`);
  } catch (error) {
    response.status(503).type('text').send(`This is the list of our students\n${error.message}`);
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

