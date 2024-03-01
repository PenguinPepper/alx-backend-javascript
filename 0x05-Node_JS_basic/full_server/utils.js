import { promises as fs } from 'fs';
import { parse } from 'csv-parse';

async function readDatabase(path) {
et data;
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
        console.log('Done');
        resolve();
      })
      .on('error', (err) => {
        reject(err);
      });
  });
}

export default readDatabase;
