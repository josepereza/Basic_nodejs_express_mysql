const express = require('express');
const path    = require('path');
const bodyParser = require('body-parser')
const mysql      = require('mysql');
const app     = express();
const port    = process.env.PORT || 3200;

app.set('view engine','ejs');
app.set(express.static(path.join(__dirname,'views')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

//Db connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'node_crud'
});

//Check if db is connected it will return connection ID

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Connected as ID => ' + connection.threadId);
});


app.get('/',function(req,res){
  var query = connection.query('select * from users', function (error, results, fields) {
  if (error) throw error;
    res.render('index',{resultSet:results});
  });
});
app.get('/addUser',function(req,res){
  res.render('add');
});
app.post('/doSaveData',function(req,res){
  var userData  = {name:req.body.name, email: req.body.email,phone_no:req.body.phone_no,address:req.body.address};
  var query = connection.query('INSERT INTO users SET ?', userData, function (error, results, fields) {
  if (error) throw error;
    res.redirect('/');
  });
});

app.get('/editUser/:id',function(req,res){
  let userId = req.params.id;
  'SELECT * FROM `books` WHERE `author` = "David"'
  var query = connection.query('SELECT * FROM `users` WHERE `id` = "+userId+"', function (error, results, fields) {
  if (error) throw error;
    res.render('edit',{userData:results});
  });
})

app.listen(port,function(){
  console.log('Server runing in port => '+port);
})
