const fs = require('fs');
const readline = require('readline');

async function parse(filePath) {
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
      const result = rows.map((row) => header.reduce((obj, key, i) => ({ ...obj, [key]: row[i] }), {}));
      resolve(result);
    });

    rl.on('error', (error) => {
      throw new Error('Cannot load the database');
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
