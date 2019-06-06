var express = require('express');
var ejs = require("ejs");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

mongoose.connect('mongoDB://127.0.0.1:27027/wikiDB',{useNewUrlParser: true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the mongoDB.")
});

app.use(bodyParser.urlencoded({extended:true}));

let  articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

let Articles = mongoose.model('Article', articleSchema);

app.listen(3000, () => console.log(`app listening on port ${port}!`))