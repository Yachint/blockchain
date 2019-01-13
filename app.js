var express = require('express');
var app = express();
app.set('view engine', 'ejs');


var Users = {

  'David': {
    age: 52,
    occupation: 'Professor',
    hobby: 'Swimming'
  },

  'Robert': {
    age: 34,
    occupation: 'Engineer',
    hobby: 'Running'
  },

  'Jane': {
    age: 28,
    occupation: 'Nurse',
    hobby: 'Chess'
  }

};

// route pages
app.get('/', function (req, res) {
    var usersArray = [];
    for (var i in Users) { usersArray.push(i); }
    res.render('index', { users: usersArray });
  });
  
app.get('/user', function (req, res) {
    var check = Users[req.query.name];
    if (check) {
      res.render('user', { name: req.query.name, info: check });
    } else {
      res.send('User does not exist...');
    }
  });
  

// what port to run server on
app.listen(3001, function () {
  console.log('server started on port 3001');
});