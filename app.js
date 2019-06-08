var express = require('express');
var ejs = require("ejs");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/WikiDB', {
  useNewUrlParser: true
})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("We're connected to the mongoDB.")
});

app.use(bodyParser.urlencoded({
  extended: true
}));

let articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

let Article = mongoose.model('Article', articleSchema);

//requests targeting specific articles.

app.route("/articles")
  .get(function (req, res) {
    Article.find(function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })

  .post(function (req, res) {
    let newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    })
    newArticle.save(function (err) {
      if (!err) {
        res.send("Successfully sent");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function (req, res) {
    Article.deleteMany(function (err) {
      if (!err) {
        res.send("Successfully deleted all of the articles");
      } else {
        res.send(err);
      }
    })
  });

//Requests targeting specific articles


  app.route("/articles/:articleTitle")
    .get(function(req,res){
      Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
        if(!err){
          res.send(foundArticle);
        } else {
          res.send("No articles matching that Article was found");
        }
      })
    })

    .put(function(req,res){
      Article.update(
        {title: req.params.articleTitle},
         {title: req.body.title, content: req.body.content},
         {overwrite: true},
         function(err, foundArticle){
          if(!err){
            res.send("Update Successful");
          } else{ 
            res.send("The update has failed")
          }
    })
    })

    .patch(function(req,res){
      Article.update(
        {title: req.params.articleTitle}, 
        {$set:req.body},
        function(err, updatedArticle){
          if(!err){
            res.send(updatedArticle);
          } else {
            res.send("There was an error updating the program");
          }
        })
    })

    .deleteOne({title: body.params.articleTitle}, function(err){
      if(err){
        res.send(err);
      } else {
        res.send("You have deleted the specific aritcle.")
      }
    });;

app.listen(3000, () => console.log(`App is now online and connected`))