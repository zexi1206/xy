var express = require('express');
var sql = require('./../sql');
var Yuyue = require('./../sql/collection/yuyue.js');
var uuid = require('node-uuid');
var utils = require('./../utils')
var router = express.Router();

router.get('/', function(req, res, next) {
    let { userid } = req.query;
    sql.find(Yuyue, {userid}, { _id: 0 }).then(data => {
      res.send({
        code: '200',
        message: '获取预约表成功',
        data: data
      })
    })
  });

router.get('/add', (req, res, next) => {
    let { userid, houseid, date, time, houer, price, num, img, housename } = req.query;
    num = num * 1 || 1
    sql.find(Yuyue, { userid, houseid, date, time }, { _id: 0 }).then(data => {
      if (data.length === 0) {
        sql.insert(Yuyue, {
          yuyueid: 'yuyue_' + uuid.v1(),
          userid,
          houseid,
          date,
          time,
          houer,
          price,
          num,
          img,
          housename
        }).then(() => {
          res.send({
            code: '200',
            message: '插入预约成功'
          })
        })
      } else {
        sql.update(Yuyue, { userid, houseid }, { $inc: { num: 1 } }).then(() => {
          res.send({
            code: '200',
            message: '增加数量成功'
          })
        })
      }
    })
  })

  router.get('/delete', (req, res, next) => {
    let { userid, houseid } = req.query
    sql.delete(Yuyue, { userid, houseid }).then(() => {
      res.send(utils.deletesuccess)
    })
  })
  



module.exports = router;