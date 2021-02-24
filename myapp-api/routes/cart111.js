var express = require('express');
var sql = require('./../sql');
var Cart = require('./../sql/collection/carts.js');
var House = require('./../sql/collection/house.js');
var uuid = require('node-uuid');
var utils = require('./../utils')
var router = express.Router();

// 查询购物车数据  ---- 依据用户id获取购物车的数据，依据 产品id获取产品的信息，然后组合数据，输出数据
router.get('/', function(req, res, next) {
  // 1、获取用户id
  let { userid } = req.query;
  // 2、依据用户id查询购物车的数据
  console.log(userid)
  sql.find(Cart, { userid }, { _id: 0 }).then(data => {
    console.log(data)
    if (data.length === 0) {
      res.send({
        code: '200',
        message: '获取购物车列表的数据',
        data: utils.cartnull
      })
      console.log(utils.cartnull)
    } else {
      // 2.2  有数据,遍历数据，获取数据的基本信息，组合数据
      let arr = []
      new Promise(resolve => { // 2.2.1内含异步操作
        data.map((item, index) => { // 2.2.2遍历数据
          // 2.2.3 依据产品的id查询数据的相关信息
          // console.log(item.cartid)
          sql.find(House, { houseid: item.houseid }, { _id: 0 }).then(data1 => {
          // console.log(data1)
            // 2.2.4 组合数据
            arr.push({
              cartid: "cart_" + uuid.v1(),
              userid: userid,
              houseid: item.houseid,
              housename: data1[0].housename,
              houseimg: data1[0].houseimg,
              price: data1[0].price,
              num: item.num
            })
            // 2.2.5 遍历所有的数据结束
            if (index >= data.length - 1) {
              resolve()
            }
          })
        })
      }).then(() => {
        // 2.2.6 返回购物车数据结果
        res.send({
          code: '200',
          message: '获取购物车列表的数据',
          length: arr.length,
          data: arr
        })
      })
      
    }
  })
});

// 加入购物车 购物车数据id 产品id 用户id  产品的数量num
router.get('/add', (req, res, next) => {
  // 1、获取数据
  let { userid, houseid, num } = req.query;
  console.log(1)
  num = num * 1 || 1 // 设定默认数量
  console.log(req.query)
  sql.find(Cart, { userid, houseid }, { _id: 0 }).then(data => {
    if (data.length === 0) {
      // 2.1没有改数据 --- 插入数据库操作
      sql.insert(Cart, {
        cartid: 'cart_' + uuid.v1(),
        userid,
        houseid,
        num
      }).then(() => {
        res.send({
          code: '200',
          message: '插入购物车成功'
        })
      })
    } else {
      // 2.2更新数据库中购物车产品的数量
      sql.update(Cart, { userid, houseid }, { $inc: { num: 1 } }).then(() => {
        res.send({
          code: '200',
          message: '加入购物车成功'
        })
      })
    }
  })
})

// 删除购物车
router.get('/delete', (req, res, next) => {
  // 1、获取删除的条件
  let { userid, houseid } = req.query
  console.log(userid)
  // 2、删除
  sql.delete(Cart, { userid, houseid }).then(() => {
    res.send(utils.deletesuccess)
  })
})

// 更新购物车
router.get('/update', (req, res, next) => {
  // 1、获取更新的数据
  let { cartid, num } = req.query
  // 2、更新数据
  sql.update(Cart, { cartid }, { $set: { num: num } }).then(() => {
    res.send(utils.updatesuccess)
  })
  
})
module.exports = router;
