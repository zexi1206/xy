import axios from '@/utils/request'
export default {
  state: { // 首页需要的初始化数据
    bannerlist: []
  },
  getters: { // state的计算属性
  },
  actions: { // 当前页面需要的异步操作
    getBannerlist (context) { // 请求轮播图数据,context上下文对象
      axios.get('/banner').then(res => {
        context.commit({ // 唯一改变状态管理器的方式就是显示的提交mutation
          type: 'changeBannerlist',
          data: res.data.data
        })
      })
    }
  },
  mutations: {
    changeBannerlist (state, data) {
      state.bannerlist = data.data
    }
  }
}
