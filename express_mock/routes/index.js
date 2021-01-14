var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/code', function (req, res, next) {
  res.send(400, { status: 400, mess: '密码错误' })
});


module.exports = router;
