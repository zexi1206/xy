module.exports = {
  publicPath: './', // 导出css以及js文件引入的方式为相对路径，默认为绝对路径
  devServer: { // 重启服务器
    proxy: 'http://localhost:3000'
  }
}
