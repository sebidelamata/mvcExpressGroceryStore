var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render(
    'categories',
    {
      title: 'Categories'
    }
  )
});

module.exports = router;
