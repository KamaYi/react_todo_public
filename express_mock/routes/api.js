var express = require('express');
var router = express.Router();
const Mock = require('mockjs');
const jwt = require('jsonwebtoken');

/* GET api listing. */
router.post('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/login', function (req, res, next) {
  console.log(req.body);
  let account = req.body.account;
  let password = req.body.password;

  if (account && password) {
    let content = { account: req.body.account }; // 要生成token的主题信息
    let secretOrPrivateKey = "0fca2793be67dda2";// 这是加密的key（密钥）
    let token = jwt.sign(content, secretOrPrivateKey, {
      expiresIn: 60 * 60 * 1  // 1小时过期
    });
    if (password != '111111') {
      res.send(422, { status: 422, msg: '密码错误',data: '' })
      return false;
    }
    res.json({ status: 200, msg: '欢迎登录',data: { token: token, realName: req.body.account } })
  } else {
    res.send(422, { status: 422, msg: '请完善信息系' , data: '' });
  }
});

router.get('/api/nav', function (req, res, next) {
  res.json({ "msg":"","menuList":[{"menuId":1,"parentId":0,"parentName":null,"name":"交易分析","url":null,"perms":null,"type":0,"icon":"transaction","orderNum":10,"open":null,"list":[{"menuId":5,"parentId":1,"parentName":null,"name":"GMV概览","url":"reports/gmv","perms":null,"type":1,"icon":null,"orderNum":10,"open":null,"list":null}]},{"menuId":4,"parentId":0,"parentName":null,"name":"财务分析","url":null,"perms":null,"type":0,"icon":"account-book","orderNum":20,"open":null,"list":[{"menuId":113,"parentId":4,"parentName":null,"name":"留存分析","url":"reports/retention-analysis","perms":null,"type":1,"icon":null,"orderNum":30,"open":null,"list":null}]},{"menuId":3,"parentId":0,"parentName":null,"name":"项目分析","url":null,"perms":null,"type":0,"icon":"project","orderNum":30,"open":null,"list":[{"menuId":7,"parentId":3,"parentName":null,"name":"项目概览","url":"reports/project","perms":null,"type":1,"icon":null,"orderNum":10,"open":null,"list":null},{"menuId":27,"parentId":3,"parentName":null,"name":"项目详情","url":"reports/xiangmu-xiangqing","perms":null,"type":1,"icon":null,"orderNum":20,"open":null,"list":null},{"menuId":51,"parentId":3,"parentName":null,"name":"垫佣项目","url":"reports/dianyong-xiangmu","perms":null,"type":1,"icon":null,"orderNum":30,"open":null,"list":null},{"menuId":30,"parentId":3,"parentName":null,"name":"垫佣项目详情","url":"reports/dianyong-xiangmu-xiangqing","perms":null,"type":1,"icon":null,"orderNum":35,"open":null,"list":null}]},{"menuId":2,"parentId":0,"parentName":null,"name":"机构分析","url":null,"perms":null,"type":0,"icon":"deployment-unit","orderNum":40,"open":null,"list":[{"menuId":6,"parentId":2,"parentName":null,"name":"机构概览","url":"reports/organization","perms":null,"type":1,"icon":null,"orderNum":10,"open":null,"list":null},{"menuId":35,"parentId":2,"parentName":null,"name":"机构详情","url":"reports/orgDetail","perms":null,"type":1,"icon":null,"orderNum":30,"open":null,"list":null},{"menuId":34,"parentId":2,"parentName":null,"name":"KA机构","url":"reports/ka","perms":null,"type":1,"icon":null,"orderNum":40,"open":null,"list":null},{"menuId":45,"parentId":2,"parentName":null,"name":"KA机构详情","url":"reports/kaDetail","perms":null,"type":1,"icon":null,"orderNum":50,"open":null,"list":null}]},{"menuId":76,"parentId":0,"parentName":null,"name":"流量分析","url":null,"perms":null,"type":0,"icon":"cloud","orderNum":50,"open":null,"list":[]},{"menuId":160,"parentId":0,"parentName":null,"name":"认购转化","url":null,"perms":null,"type":0,"icon":"cloud","orderNum":60,"open":null,"list":[{"menuId":161,"parentId":160,"parentName":null,"name":"认购订单线上占比","url":"reports/subscribeRate","perms":null,"type":1,"icon":null,"orderNum":0,"open":null,"list":null},{"menuId":163,"parentId":160,"parentName":null,"name":"连接认购转化","url":"reports/linkSubscribe","perms":null,"type":1,"icon":null,"orderNum":1,"open":null,"list":null}]},{"menuId":152,"parentId":0,"parentName":null,"name":"下载中心","url":null,"perms":null,"type":0,"icon":"download","orderNum":70,"open":null,"list":[{"menuId":153,"parentId":152,"parentName":null,"name":"订单明细","url":"reports/download","perms":null,"type":1,"icon":null,"orderNum":0,"open":null,"list":null},{"menuId":165,"parentId":152,"parentName":null,"name":"订单实时简表","url":"reports/orderDetail","perms":null,"type":1,"icon":null,"orderNum":100,"open":null,"list":null},{"menuId":157,"parentId":152,"parentName":null,"name":"连接认购转化明细","url":"reports/linkDetail","perms":null,"type":1,"icon":null,"orderNum":105,"open":null,"list":null},{"menuId":156,"parentId":152,"parentName":null,"name":"楼盘流量供应及承接","url":"reports/traDetail","perms":null,"type":1,"icon":null,"orderNum":110,"open":null,"list":null},{"menuId":168,"parentId":152,"parentName":null,"name":"经纪人流量获取及承接","url":"reports/brokerDetail","perms":null,"type":1,"icon":null,"orderNum":120,"open":null,"list":null},{"menuId":154,"parentId":152,"parentName":null,"name":"我的下载","url":"reports/myLoad","perms":null,"type":1,"icon":null,"orderNum":1400,"open":null,"list":null}]}],"status":200,"permissions":[]} )
});

module.exports = router;
