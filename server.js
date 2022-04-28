const express = require('express');
var app = express();
const path = require('path');
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/views')));
// use res.render to load up an ejs view file
// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.listen(8080);
console.log('Server is listening on port 8080');