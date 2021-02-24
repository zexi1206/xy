const mongoose = require('../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 设计预约表的集合
const problemSchema = new Schema({ // 设计预约集合表
  yuyueid: {type: String},
  userid: {type: String},
  houseid: {type: String},
  date: {type: String},
  time: {type: String},
  houer: {type: String},
  price: {type: Number},
  num: {type: Number},
  img: {type: String},
  housename: {type: String}
})

module.exports = mongoose.model('Yuyue',problemSchema);