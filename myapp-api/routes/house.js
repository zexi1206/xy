var express = require('express');
var House = require('./../sql/collection/house.js');
var sql = require('./../sql');
var xlsx = require('node-xlsx');
var uuid = require('node-uuid');
var filestr = 'C:/Users/Administrator/Desktop/webapi/myapp/house.xlsx';
var router = express.Router();

router.get('/home', function(req, res, next) {
  // let { houseid } = req.query;
  // 通过房型ID获取所有信息
  sql.find(House, {}, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '获取房型数据成功',
      data: data
    })
  })
});

router.get('/house', function(req, res, next) {
  // 1、获取前端的查询条件
  // console.log(res)
  let { pageCode, limitNum } = req.query;
  // 2、设置页码和每页显示个数的默认值  ---- 数据类型
  pageCode = pageCode * 1 || 0;
  limitNum = limitNum * 1 || 10;
  // 3、查询数据
  sql.paging(House, {}, { _id: 0 }, limitNum, pageCode).then(data => {
    // 4、返回数据
    res.send({
      code: '200',
      success: '查询列表成功',
      length: data.length,  
      data: data
    })
  })
})

router.get('/subscribe',(req,res,next) => {
  let { type } = req.query
  sql.find(House, { type }, { _id: 0 }).then(data => {
    console.log(data)
    res.send({
      code: '200',
      message: '获取房型数据成功',
      data: data
    })
  })
})

router.get('/import', (req, res, next) => {
  console.log(111)
  // 1、获取表格信息
  let obj = xlsx.parse(filestr)[0].data
  let arr = []
  // 2、遍历数据 --- 排除第一条数据
  obj.map((item, index) => {
    if (index !== 0) {
      // 3.生成一个产品的id,插入书
      arr.push({
        houseid: "house_" + uuid.v1(),
        fuwu: item[0],
        houseimg: item[1],
        housename: item[2],
        price: item[3],
        detail: item[4],
        duration: item[5],
        time: item[6],
        date: item[7],
        ways: item[8],
        show: item[9],
        type: item[10],
        youhui: item[11]
      }) 
    }
  })

  // 4、插入数据库
  sql.insert(House, arr).then(() => {
    res.send(arr)
  })
  
})


module.exports = router;
