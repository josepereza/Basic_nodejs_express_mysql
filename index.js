const express = require('express');
const path    = require('path');
const app     = express();
const port    = process.env.PORT || 3200;

app.set('view engine','ejs');
app.set(express.static(path.join(__dirname,'views')));

app.get('/',function(req,res){
  res.render('index');
})

app.listen(port,function(){
  console.log('Server runing in port => '+port);
})
