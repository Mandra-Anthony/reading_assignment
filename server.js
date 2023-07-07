//server.js
//console.log('May Node be with you')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.listen(3000, function () {
  console.log('listening on 3000')
})

app.set('view engine', 'ejs')

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }))

// All your handlers here...
app.post('/quotes', function(req, res) {
  console.log(req.body)
})
app.get('/', function (req, res) {
  res.sendFile('/Users/anthonymandra/WebDevHW' + '/index.html')
  // Note: __dirname is the current directory you're in. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

/*
app.post('/quotes', function(req, res) {
  console.log('Hellooooooooooooooooo!')
})
*/

const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://tonybnyc127:password127@cluster0.ipgynqr.mongodb.net/?retryWrites=true&w=majority', function(err, client) {
  if (err) return console.error(err)
  const db = client.db('star-wars-quotes')
  const quotesCollection = db.collection('quotes')
  app.use(/* ... */)
  app.get('/', function(req, res) {
    const cursor = db.collection('quotes').find()
    console.log(cursor)
    db.collection('quotes')
    .find()
    .toArray()
    .then(results => {
      res.render('index.ejs', { quotes: results })
    })
    .catch(/* ... */)
  })
  app.post('/quotes', function(req, res) {
    quotesCollection
      .insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
  })
  app.listen(/* ... */)
})
.catch(console.error)
