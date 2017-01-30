var express = require('express');
var router = express.Router();

/* GET page1 page. */
router.get('page1', function(req, res, next) {
  res.render('page1', { title: 'Express' });
});

module.exports = router;
