var express = require('express');
var router = express.Router();
var Recipe = require('../schemas/recipe');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/saveOne', function(req, res, next) {
  var recipe = new Recipe({
    title: "Moms Stroghanff",
    author: "Mom",
    img: "",
    description: "Mix it all up",
    ingredients: [{ ingredient: "Basil", quantity: "2" }]
  }).save(function(err, recipe) {
    if (err) {
      console.error(err);
      res.status(500).json({status: "failed"});
    }
  })
  res.render('index', { title: 'Express' });
});

router.get('/showOne', function(req, res, next) {
  Recipe.findOne({author: "Mom"})
  .lean()
  .exec(function(err, doc) {
    if (err) {
      console.error(err);
      res.status(500).json({status: "failed"});
    } else {
      res.json(doc);
    }
  });
});

router.get('/api', function(req, res) {
  terms = {first: "test", last:"user"};
  res.json(terms);
});


module.exports = router;
