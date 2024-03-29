const http = require('http');

const port = 1245;
const hostname = '127.0.0.1';

const app = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello Holberton School!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at ${hostname} on ${port}`);
});

module.exports = app;
