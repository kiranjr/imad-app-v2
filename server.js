var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html')); 
});

var articleone={
    title: 'Article one | Kiranjr.',
    heading: 'Article-one',
    date: 'FEB 9,2017',
    content: `<p>
                    hi!this my first content in my first webapp ,hope so that i will learn it little more when i need this .
                </p>`
};

function createtemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmltemplate = `
            <html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name="viewpot" content="width-device-width , initial-scale =1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="container">
                    <div>
                        <a href='/'>home</a>
                    </div>
                    <hr/>
                    <h3>
                        ${heading}
                    </h3>
                    <div>
                        ${date}
                    </div>
                    <div>
                        <p>
                            ${content}
                        </p>
                    </div>
                </div>
            </body>
        </html>
    `;
    return htmltemplate;
}

app.get('/article-one',function (req,res) {
    res.send(createtemplate(articleone));   
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
