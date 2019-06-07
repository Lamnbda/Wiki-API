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

app.route("/articles").get(function (req, res) {
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
  })

app.listen(3000, () => console.log(`App is now online and connected`))