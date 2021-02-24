var express = require('express');
var House = require('./../sql/collection/house.js');
var sql = require('./../sql');
var router = express.Router();

router.get('/', function(req, res, next) {
    let { type } = req.query
    // 通过房型ID获取所有信息
    console.log(type)
    sql.find(House, { type }, { _id: 0 }).then(data => {
      res.send({
        code: '200',
        message: '获取分类数据成功',
        data: data
      })
    })
  });
  module.exports = router;