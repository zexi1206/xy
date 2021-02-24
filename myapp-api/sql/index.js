const sql = {
  // 数据库集合靠函数去传递
  insert (CollectionName, insertData) {
    // 数据库的操作属于异步操作，后续的业务逻辑会交给执行的那个单位
    // A 调用了B B包含异步操作,操作完毕 A继续执行业务逻辑
    // 异步操作  --- 回调函数 / promise / generator + yeild / async + await
    // User.insertMany(insertData, (err) => {
    //   if (err) throw err;
    //   console.log('插入成功')
    // })
    // promise的写法
    // return new Promise((resolve, reject) => {
    // })
    return new Promise((resolve, reject) => {
      CollectionName.insertMany(insertData, (err) => {
        if (err) throw err;
        resolve()
      })
    })
  },
  delete (CollectionName, deleteData, deleteType) {
    
    deleteType = deleteType || 'deleteOne' // 默认为删除单条数据

    return new Promise((resolve, reject) => {
      CollectionName[deleteType](deleteData, (err) => {
        if (err) throw err;
        resolve()
      })
    })
  },
  update (CollectionName, whereObj, updateObj, updateType) {
    updateType = updateType || 'updateOne'
    return new Promise((resolve, reject) => {
      CollectionName[updateType](whereObj, updateObj, (err) => {
        if (err) throw err;
        resolve()
      })
    })
  },
  find (CollectionName, whereObj, showObj) {
    return new Promise((resolve, reject) => {
      CollectionName.find(whereObj, showObj).exec((err, data) => {
        if (err) throw err;
        resolve(data)
      })
    })
  },
  paging (CollectionName, whereObj, showObj, limitNum, pageCode) {
    return new Promise((resolve, reject) => {
      // limit(limitNum) 每页显示个数
      // skip(limitNum * pageCode) // 每页从哪一个开始
      CollectionName.find(whereObj, showObj).limit(limitNum).skip(limitNum * pageCode).exec((err, data) => {
        if (err) throw err;
        resolve(data)
      })
    })
  },
  distinct(CollectionName, name) {
    return new Promise((resolve, reject) => {
      CollectionName.distinct(name).exec((err, data) => {
        if (err) throw err;
        resolve(data)
      })
    })
  }
}

module.exports = sql