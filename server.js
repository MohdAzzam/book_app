'use strict';
const PORT = 3000;

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);

client.connect().then(() => {
    console.log('Runnnnnnnnnn');
});

// Application Middleware
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
function Book(obj) {
    console.log(obj.imageLinks ? obj.imageLinks.thumbnail : 'https://i.imgur.com/J5LVHEL.jpg');
    this.img = obj.imageLinks ? obj.imageLinks.thumbnail.replace('http', 'https') : 'https://i.imgur.com/J5LVHEL.jpg',
    this.title = obj.title,
    this.author = obj.authors,
    this.description = obj.description || 'there is No description about this book yet !!'
}

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/search/new', (req, res) => res.render('pages/searches/new'));

app.post('/searches', createSearch);

app.post('/addFav',(req,res)=>{
    console.log(req.body);
    

})
function createSearch(request, response) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';
    if (request.body.search[1] === 'title') { url += `+intitle:${request.body.search[0]}`; }
    if (request.body.search[1] === 'author') { url += `+inauthor:${request.body.search[0]}`; }

    superagent.get(url)
        .then(apiResponse => {
            console.log(apiResponse.body.items);

            return apiResponse.body.items
            .map(bookResult => {
                  
                    return new Book(bookResult.volumeInfo)
                })
        })
        .then(results => response.render('pages/searches/show', { searchResults: results }))
}


app.listen(process.env.PORT || PORT, () => console.log(`Server Run at port : ${PORT}`))
