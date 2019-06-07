var express = require('express');
var ejs = require("ejs");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/WikiDB',{useNewUrlParser: true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We're connected to the mongoDB.")
});

app.use(bodyParser.urlencoded({extended:true}));

let articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

let Article = mongoose.model('Article', articleSchema);

app.get("/articles", function(req,res){
  Article.find(function(err, foundArticles){
    if(!err){
      res.send(foundArticles);
    } else {
      console.log(err);
    }
  });
});

app.post("/articles", function(req,res){
let newArticle = new Article ({
  title: req.body.title,
  content: req.body.content
})

newArticle.save(function(err){
  if(!err){
    console.log("Successfully sent");
  } else{
    console.log(err);
  }
});

});

app.listen(3000, () => console.log(`App is now online and connected`))