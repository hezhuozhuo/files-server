var express = require('express');
var router = express.Router();
var sqlite = require('../src/sqlite');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  res.send('Got a POST request')
})

router.put('/', (req, res) => {
  res.send('Got a PUT request at /')
})

router.delete('/', (req, res) => {
  res.send('Got a DELETE request at /')
})

module.exports = router;
