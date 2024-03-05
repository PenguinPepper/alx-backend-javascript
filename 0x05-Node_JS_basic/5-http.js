const fs = require('fs').promises;
const countStudents = require('./3-read_file_async');
const http = require('http');

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
