const express = require('express');
const countStudents = require('./3-read_file_async');

//should be assigned to the variable app and this one must be exporte
// HTTP server should listen on port 1245
// It should return plain text
// When the URL path is /, it should display Hello Holberton School! in the page body
// When the UL path is /students. it should display This is the list of our students
// followed by the same content as the file 3-read_file_async.js(with and without the database) -
// the name of the databasr must be passed as argument of the file
// CSV file can contain empty lines (at the end) - and they are not a valid student
/* 
 # app = express();
 # port = 1245
 # url(/) should send "Hello Hoblerton"
 # url(/students) send "This is a liste of students" and 3-read_file_async.js logic
 # import 3-read_file_async.js and call countStudents
 # pass commandline argument to countStudents
 # app.listen(port)
*/

const app = express();
const port = 1245;

app.get('/', (request, response) => {
    return response.send('Hello Holberton School!');
})

app.get('/students', (request, response) => {
    const students = countStudents(process.argv[2])
    return response.send(`This is the list of our students\n ${students}`)
})

app.listen(port);