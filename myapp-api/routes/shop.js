var express = require('express');
var sql = require('./../sql');
var House = require('./../sql/collection/house');
var router = express.Router();

router.get('/', function(req, res, next) {
    let { houseid } = req.query;
    console.log(houseid);
    // 通过房型ID获取所有信息
    sql.find(House, { houseid }, { _id: 0 }).then(data => {
      res.send({
        houseid: houseid,
        code: '200',
        message: '获取房型数据成功',
        data: data
      })
    })
  });

  module.exports = router;
