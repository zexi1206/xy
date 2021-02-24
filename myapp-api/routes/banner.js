var express = require('express');
var Banner = require('./../sql/collection/banner.js');
var sql = require('./../sql');
var xlsx = require('node-xlsx');
var uuid = require('node-uuid');
var router = express.Router();
var filestr = 'C:/Users/Administrator/Desktop/webapi/myapp/lunbotu.xlsx';

router.get('/', function(req, res, next) {
    // let { bannerid } = req.query;
    // 通过房型ID获取所有信息
    sql.find(Banner, { }, { _id: 0 }).then(data => {
      res.send({
        code: '200',
        message: '获取轮播图数据成功',
        data: data
      })
    })
  });

  router.get('/import', (req, res, next) => {
    // 1、获取表格信息
    let obj = xlsx.parse(filestr)[0].data
    let arr = []
    // 2、遍历数据 --- 排除第一条数据
    obj.map((item, index) => {
      if (index !== 0) {
        // 3.生成一个产品的id,插入书
        arr.push({
          bannerid: "banner_" + uuid.v1(),
          type: item[0],
          bannerimg: item[1],
          bannername: item[2],
          price: item[3],
          detail: item[4],
          duration: item[5],
          time: item[6],
          date: item[7],
          ways: item[8],
          show: item[9]
        }) 
      }
    })
  
    // 4、插入数据库
    sql.insert(Banner, arr).then(() => {
      res.send(arr)
    })
    
  })
  
  module.exports = router;
  