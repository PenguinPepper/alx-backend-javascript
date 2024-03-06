<<<<<<< HEAD
const fs = require('fs');
const readline = require('readline');

async function parse(filePath) {
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const lines = [];

  for await (const line of rl) {
    if (line.trim() !== '') {
      lines.push(line.split(',').map((value) => value.trim()));
    }
  }

  const [header, ...rows] = lines;
  return rows.map((row) => header.reduce((obj, key, i) => ({ ...obj, [key]: row[i] }), {}));
}
||||||| d46fd81f
const fs = require('fs').promises;
const { parse } = require('csv-parse');
=======
const readPromise = require('fs').promises;
const fs = require('fs');
const readline = require('readline');

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
>>>>>>> df4457d2f5c492958dd2c1cc68faf531800c5ac1

async function countStudents(path) {
<<<<<<< HEAD

||||||| d46fd81f
  let data;
=======
  let students;
>>>>>>> df4457d2f5c492958dd2c1cc68faf531800c5ac1
  try {
<<<<<<< HEAD
    const students = await parse(path);
||||||| d46fd81f
    data = await fs.readFile(path);
=======
    students = await parse(path);
>>>>>>> df4457d2f5c492958dd2c1cc68faf531800c5ac1
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

      console.log(`Number of students: ${students.length}`);
      for (const field in fields) {
        if (field) {
          console.log(`Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`);
        }
      }
      resolve();
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

module.exports = countStudents;
