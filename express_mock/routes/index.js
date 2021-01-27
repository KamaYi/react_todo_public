var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/nav', function (req, res, next) {
  res.json({ status: 200, msg: '欢迎登录',data: { token: '', realName: ''} })
});


module.exports = router;
