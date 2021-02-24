const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/massage';

mongoose.connect(DB_URL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log('数据库连接成功')
})

mongoose.connection.on('disconnected', () => {
  console.log('数据库断开')
})

mongoose.connection.on('error', () => {
  console.log('数据库连接异常')
})

// 将此文件作为一个模块 暴露出去，供别人调用
module.exports = mongoose;