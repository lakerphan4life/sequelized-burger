var express = require('express');
var router = express.Router();
var models = require('../models');



router.get('/', function (req, res) {
  models.Burger.findAll({}).then(function (data) {
    var hbsObject = { burgers: data };
    res.render('index', hbsObject);
  });
});

router.post('/create', function (req, res) {
  models.Burger.create({burger_name: req.body.burger_name, devoured: false})
  .then(function() {
    res.redirect('/');
  });
});

router.put('/update/:id', function (req, res) {

  models.Burger.update({ devoured: req.body.devoured }, {where: {id:req.params.id}})
  .then(function () {
    res.redirect('/');
  });
});

router.delete('/delete/:id', function (req, res) {

  models.Burger.destroy({where: {id:req.params.id}}).then(function() {
    res.redirect('/');
  });
});

module.exports = router;