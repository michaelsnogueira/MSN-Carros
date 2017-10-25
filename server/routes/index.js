'use strict';

var express = require('express');
var router = express.Router();
var cars = [];

router.get('/', function(req, res) {
  res.json(cars);
});

router.post('/', function(req, res) {
  var image = req.body.image;
  var brandModel = req.body.brandModel;
  var year = req.body.year;
  var plate = req.body.plate;
  var color = req.body.color;

  var hasCars = cars.some(function(car){
    return car.plate === plate;
  });

  if(!hasCars){
    cars.push({
      image: image,
      brandModel: brandModel,
      year: year,
      plate: plate,
      color: color
    });
  }
});

router.delete('/', function(req, res) {
  cars = cars.filter(function(car) {
    return car.plate !== req.body.plate;
  });
  res.json({ message: 'success' });
});

module.exports = router;
