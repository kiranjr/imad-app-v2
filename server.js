var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html')); 
});

var articles = {
     'article-one' : {
                title: 'Article one | Kiranjr.',
                heading: 'Article-one',
                date: 'FEB 9,2017',
                content: `<p>
                                hi!this my first content in my first webapp ,hope so that i will learn it little more when i need this .
                            </p>`
            },
     'article-second' : {
                title: 'Article second | kiranjr.',
                heading: 'Article-second',
                date: 'MAR 17,2017',
                content: `<p>
                            hi ! This My Second Article.
                          </p>`
            },
     'article-third' : {
                title: 'Article third | kiranjr.',
                heading: 'Article-third',
                date: 'OCT 22,2017',
                content: `
                    <p>
                        Hi ! This My Third Article.<br>
                        And This My New Line.
                    </p>` 
            }
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

app.get('/:articlename',function (req,res) {
    var articlename = res.params.articlename;
    res.send(createtemplate(articles[articlename]));   
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
