var express = require('express');
var router = express.Router();
var sql = require('./../sql')
var Address = require('./../sql/collection/address')
var uuid = require('node-uuid')

/* 地址管理. */
router.get('/', function(req, res, next) {
  let { userid, isDefault } = req.query
  isDefault = isDefault * 1 || 0
  sql.find(Address, { userid, isDefault }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      res.send({
        code: '111',
        message: '没有默认地址'
      })
    } else {
      res.send({
        code: '211',
        message: '获取地址',
        data: data
      })
    }
    console.log(data)
  })
});

router.get('/one', (req, res, next) => {
  let { addressid } = req.query
  sql.find(Address, { addressid }, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '获取成功',
      data: data
    })
  })
})


router.get('/addresslist', (req, res, next) => {
  let { userid } = req.query
  sql.find(Address, { userid }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      res.send({
        code: '000',
        message: '没有地址'
      })
    } else {
      res.send({
        code: '211',
        message: '获取地址',
        data: data
      })
    }
  })
})


router.post('/add', (req, res, next) => {
  let { userid, name, tel, address, isDefault } = req.body
  isDefault = isDefault * 1 || 0
  let addressid = 'address_' + uuid.v1()
  sql.insert(Address, { userid, name, tel,  address, isDefault, addressid }).then(() => {
    if (isDefault) {
      sql.update(Address, { userid }, { $set: { isDefault: 0 } }, 'updateMany').then(() => {
        sql.update(Address, { addressid }, { $set: { isDefault: 1 } }).then(() => {
          res.send({
            code: '212',
            message: '设置默认地址成功'
          })
        })
      })
    }else{
      res.send({
        code:'100',
        message:'当前地址不是默认地址'
      });
    }
  })
})


router.get('/delete', (req, res, next) => {
  let { addressid } = req.query
  sql.delete(Address, { addressid }).then(() => {
    res.send({
      code: '222',
      message: '删除成功'
    })
  })
})


router.post('/addressedit', (req, res, next) => {
  let { addressid, userid, name, tel, address, isDefault, areaCode } = req.body
  isDefault = isDefault * 1 || 0
  sql.update(Address, { addressid }, { name, tel, address, areaCode, isDefault} ).then(() => {
    if (isDefault) {
      sql.update(Address, { userid }, { $set: { isDefault: 0 } }, 'updateMany').then(() => {
        sql.update(Address, { addressid }, { $set: { isDefault: 1 } }).then(res => {
          res.send({
            code: '310',
            message: '修改成功'
          })
        })
      })
    }
    res.send({
      code: '310',
      message: '修改成功'
    })
  })
})
module.exports = router;
