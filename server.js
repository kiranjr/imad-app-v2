var express = require('express');
var morgan = require('morgan');
var path = require('path');
var pool = require('pg').pool;

var config = {
    user: 'kiranjr',
    database: 'kiranjr',
    host: 'db.imad.hasura-app.io',
    port: '5625',
    password : process.env.DB_PASWORD
};
    

var app = express();
app.use(morgan('combined'));

var pool = new Pool(config);
app.get('/test-db', function(req,res) {
    pool.qurey('SELECT * FROM test',function(err,result){
        if(err)
        {
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringfy(result));
        }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/article-one',function (req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));   
});

app.get('/article-second',function (req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-second.html'));   
});

app.get('/article-third',function (req,res) {
    res.sendFile(path.join(__dirname, 'ui', 'article-third.html'));    
});

app.get('/profile',function(req,res) {
       res.sendfile(path.join(__dirname, 'ui', 'profile.html'));   
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
