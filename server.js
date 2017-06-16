var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');

var config = {
  user: 'kiranjr',
  database: 'kiranjr',
  host: 'db.imad.hasura-app.io',
  port: '5432',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var pool = new Pool(config);
app.get('/test-db',function(req,res){
   pool.query('SELECT * FROM test',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result.rows));
      }
   }); 
});

var che={
    title: 'Chevrolet',
    content:` <h1>
                Camaro
            </h1>
            <img src="http://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2017/performance/camaro/mov/01-images/2017-camaro-sport-coupe-intro-02.jpg?imwidth=1500" class="img-small"/>
            <br>
            <br>
            <br>
            <h1>
                Corvette
            </h1>
            <img src="http://www.chevrolet.ca/content/dam/Chevrolet/northamerica/ca/nscwebsite/en/home/vehicles/performance/2017_corvette_grand_sport/01_images/3.%20Design/ca-2017-chevrolet-corvette-grand-sport-sports-car-mo-design-635x357-08.jpg" class="img-small"/>` 
};

function createTemplate (data) {
    var title = data.title;
    var content = data.content;
    var Temp =
    `<html>
        <head>
            <title>
                ${title}
            </title>
                <meta name="viewpot" content="width-device-width , initial-scale =1" />
            <style>
            .container{
                max-width: 800px;
                margin: 0 auto;
                color: grey;
                font-family: monospace;
            }
            </style>
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>BACK</a>
                </div>
                <hr/>
                ${content}  
            </div>
        </body>
    </html>
    `;
    return Temp;
}

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html')); 
});

app.get('/chevy',function (req,res){
  res.send(createTemplate(che)); 
});

app.get('/ford', function (req ,res){
   res.sendfile(path.join(__dirname,'ui','ford.html')); 
});

app.get('/s',function (req, res){
   res.sendfile(path.join(__dirname,'ui','sim.html')); 
});

function hash (input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res){
   var hashString = hash(res.params.input, 'this-some-random-string');
   res.send(hashString);
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
