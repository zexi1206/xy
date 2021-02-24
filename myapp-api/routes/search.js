var express = require('express');
var sql = require('./../sql');
var House = require('./../sql/collection/house.js');
var router = express.Router();

router.get('/', (req, res, next) => {
    let { text } = req.query
    console.log(text)
    sql.find(House, { housename: eval('/'+text+'/') }, {_id: 0}).then(data => {
      res.send({
        code: '200',
        message: '搜索列表',
        data: data
      })
    })
  })
  module.exports = router;