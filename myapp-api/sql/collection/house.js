const mongoose = require('./../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 设计用户表的集合
const houseSchema = new Schema({ // 设计用户集合的字段以及数据类型
  houseid: {type: String },
  fuwu: { fuwu: String },
  houseimg: { type: String },
  housename: { type: String },
  price: { type: String },
  detail: { type: String },
  duration: { type: String },
  time: { type: String },
  date: { type: String },
  ways: { type: String },
  show: { type: String },
  type: { type: String },
  youhui: {type: String}
})

module.exports = mongoose.model('House', houseSchema);
