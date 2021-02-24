const mongoose = require('./../db.js'); // 引入数据库连接模块
const Schema = mongoose.Schema; // 拿到当前数据库相应的集合对象

// 设计用户表的集合
const bannerSchema = new Schema({ // 设计用户集合的字段以及数据类型
    bannerid: {type: String },
    type: { type: String },
    bannerimg: { type: String },
    bannername: { type: String },
    price: { type: String },
    detail: { type: String },
    duration: { type: String },
    time: { type: String },
    date: { type: String },
    ways: { type: String },
    show: { type: String }
})

module.exports = mongoose.model('Banner', bannerSchema);
