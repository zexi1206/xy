var express = require('express');
var xlsx = require('node-xlsx');
var uuid = require('node-uuid');
var sql = require('./../sql');
var Problem = require('./../sql/collection/problems');
var filestr = 'E:/node-api/webapi/myapp/problem.xlsx';

var router = express.Router();


router.get('/', (req, res, next) => {
  // 1、获取表格信息
  sql.find(Problem, {}, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: 'problem数据成功',
      data: data
    })
    // console.log(data)
  })
})

router.get('/import', (req, res, next) => {
  // 1、获取表格信息
  let obj = xlsx.parse(filestr)[2].data
  let arr = []
  obj.map((item, index) => {
    if (index !== 0) {
      arr.push({
        problemid: uuid.v1(),
        problem: item[0],
        answer: item[1],
        problemimg: item[2],    
        type: item[3]
      }) 
    }
  })

  // 4、插入数据库
  sql.insert(Problem, arr).then(() => {
    res.send(arr)
  })
})

// 获取问题的答案
router.get('/answer', (req, res, next) => {
  let { problemid } = req.query
  sql.find(Problem, { problemid }, { _id: 0 }).then(data => {
    res.send({
      code: '200',
      message: '查询该数据成功',
      data: data[0]
    })
  })
})

module.exports = router;
