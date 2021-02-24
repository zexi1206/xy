<template>
  <div class="box">
    <header class="header1">
      <input type="text" class="search" placeholder="请输入你要搜索的内容" @keyup="search($event)" v-model="value"/>
      <ul v-if="searchflag" class="search-content">
        <!-- <router-link tag="li" v-for= "(item) of arrlist" :key="item.houseid" to="/shop" class="li">{{item.housename}}</router-link> -->
        <li v-for= "(item) of arrlist" :key="item.houseid" @click="searchadd(item.housename)" class="searchlist">{{item.housename}}</li>
      </ul>
      <span class="iconfont icon-saoma"></span>
    </header>
    <div class="content" id="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <!-- 轮播图 -->
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="item of bannerlist" :key="item.bannerid">
            <img :src="item.bannerimg" alt="">
          </van-swipe-item>
        </van-swipe>
        <!-- 使用组件 -->
        <div class="choose">
          <ul>
            <router-link tag="li" to="/list?type=anmo" class="anmo"><img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b9a03edce55b.png"><p>按摩</p></router-link>
            <router-link tag="li" to="/list?type=sangna" class="sangna"><img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b9a03ecce0ab.png"/><p>桑拿</p></router-link>
            <router-link tag="li" to="/list?type=xiuxian" class="xiuxian"><img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b9a03ebc8ca6.png"/><p>休闲</p></router-link>
            <router-link tag="li" to="/list?type=xiyu" class="xiyuxitong"><img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b9a03eac3485.png"/><p>洗浴</p></router-link>
          </ul>
        </div>
        <div class="server">
          <h3>招牌服务</h3>
          <span>Signboard service</span>
        </div>
        <div class="lateral-sliding">
          <div class="lateral-sliding-item" v-for="(item,index) in prolist" :key="index" @click="shoplist(item.houseid)">
          <div class="each-img">
            <img :src="item.houseimg"/>
            <p>{{item.housename}}</p>
            <span class="price">{{"￥"+item.price}}</span><span class="iconfont icon-tianjia"></span>
          </div>
          </div>
        </div>
        <div class="tel">
          <div class="toptel">
            <img src="https://img.zhichiwangluo.com/zcimgdir/thumb/t_15368087725b99d7446b172.jpg" alt="">
            <span>健康洗浴中心</span>
          </div>
          <div class="bottel">
            <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b9b20b0bf023.png" alt="">
            <span>16663222223</span>
            <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b9b20af1a76c.png" alt="" class="clock">
            <span>08:00--22:00</span>
          </div>
          <div class="line"></div>
          <div class="address">
            <img src="https://img.zhichiwangluo.com/zcimgdir/album/file_5b9b20ad54f2b.png" alt="">
            <span>广东省深圳市南山区粤海大道305号</span>
          </div>
        </div>
        <div class="guess">
          <h3>猜你喜欢</h3>
          <span>Guess what you like</span>
        </div>
        <van-list
          v-if="flag"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多l"
          @load="onLoad"
        >
          <Prolist  :prolist="prolist"/>
        </van-list>
        <div v-else class="login-more">
          登陆之后才能看到更多的信息
          <router-link to="/login">登陆</router-link>
        </div>
      </van-pull-refresh>
      <span @click="backtop" v-show="topflag" class="backtop iconfont icon-icon-test"></span>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/request'
import Vue from 'vue'
import { Swipe, SwipeItem, List, PullRefresh } from 'vant'
import Prolist from '@/components/Prolist.vue'
import { mapState } from 'vuex'
Vue.use(Swipe).use(SwipeItem)
Vue.use(List)
Vue.use(PullRefresh)
export default {
  components: {
    Prolist
  },
  data () {
    return {
      // bannerlist: [],
      prolist: [],
      flag: true,
      loading: false, // 表示当前是不是正在加载，如果为真，表示可以请求数据，请求成功置为false
      finished: false, // 为true表示所有数据都已加载完毕
      pageCode: 0,
      isLoading: true, // 在不在刷新，如果为真，可以请求数据，请求完毕设置为false
      topflag: true, // 默认不显示返回顶部图标
      top: 0,
      items: 8,
      value: '',
      searchflag: true,
      arrlist: []
    }
  },
  computed: {
    ...mapState({
      bannerlist: (state) => {
        console.log(state)
        return state.home.bannerlist
      }
    })
  },
  created () {
    this.$store.dispatch('getBannerlist')
    axios.get('/house').then(res => {
      // console.log(res.data)
      if (res.data.code === '10119') {
        this.flag = false
      } else {
        this.flag = true
        this.items = res.data.data
      }
    })
  },
  watch: {
    pageCode (newval, oldval) {
      if (newval > 2) {
        this.topflag = true
      } else {
        this.topflag = false
      }
    }
  },
  methods: {
    onLoad () { // 页面触底 触发该函数，可以加载下一页的数据
      this.loading = true // 开始加载数据
      axios.get('/house?limitNum=5&pageCode=' + this.pageCode).then(res => {
        console.log('加载')
        this.loading = false // 表示加载结束
        this.pageCode++ // 加载结束 页码加1
        if (res.data.code === '10119') { // 未登录
          this.flag = false
        } else { // 可以拿到数据
          this.flag = true
          // 判断有没有数据，如果没有数据，告诉没有数据了，如果有数据，拼接数据
          if (res.data.data.length === 0) {
            this.finished = true // 表示数据已经加载完毕
          } else {
            // 拼接数据 ----- 数组的合并
            // arr.concat(arr1)
            // [...arr, ...arr1]  es6中的合并数组
            this.prolist = [...this.prolist, ...res.data.data]
          }
        }
      })
    },
    onRefresh () { // 下拉触发此函数
      this.isLoading = true // 表示可以请求第一页（默认）的数据
      axios.get('/house').then(res => {
        console.log(res.data)
        this.isLoading = false // 表示下拉刷新请求函数结束
        if (res.data.code === '10119') {
          this.flag = false
        } else {
          this.flag = true
          this.finished = false // 表示还可以继续上拉加载
          this.pageCode = 1 // 下拉刷新即加载第一页数据，刷新之后重置页码
          this.prolist = res.data.data // 下拉刷新就是直接替换列表
        }
      })
    },
    backtop () {
      document.getElementById('content').scrollTop = 0
      // this.topflag = false
    },
    shoplist (id) {
      this.$router.push({ path: '/shop', query: { houseid: id } })
    },
    search (event) {
      axios.get('/search?text=' + this.value).then(res => {
        this.arrlist = res.data.data
      })
      if (event.keyCode === 13) {
        this.$router.push('/qq?housename=' + this.value)
      }
    },
    searchadd (val) {
      this.value = val
      this.$router.push('/qq?housename=' + val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../lib/reset.scss';
.van-swipe {
  height: 1.8rem;
  img {
    width: 100%;
    height: 1.8rem;
  }
}
.header1{
  height:0.44rem;
  background-image: linear-gradient(to right,#019bfd,#01b9ff);
  .search {
    margin-left: 14%;
    height: 0.34rem;
    width: 70%;
    margin-top: 0.04rem;
    border: none;
    padding-left: 5%;
    border-radius: 3%;
  }
  .icon-saoma {
    font-size: 30px;
    float: right;
    margin-right: 0.1rem;
  }
  .search-content{
    position: fixed;
    top: 0.44rem;
    z-index: 6;
    background:#fff;
    width:100%;
    // border:solid 1px #eeeeee;
    li{
      padding:5px;
      height: 0.44rem;
      line-height: 0.44rem;
      margin-left: 0.05rem;
      font-size: 16px;
      border-bottom: 1px solid #efefef;
    }
  }
}

.backtop {
  position: fixed;
  bottom: 60px;
  right: 10px;
  font-size: 30px;
}
.choose{
  ul{
    @include flexbox();
    @include align-items();
    @include justify-content(space-around);
    height:105px;
    li{
      img{
        height:29.3px;
        width:29.3px;
      }
      p{
        margin-top:5px;
      }
    }
  }
}
.server{
  text-align: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 0.1rem;
  h3{
    width: 25%;
    margin-left: 38%;
    border-bottom: 1px solid #666;
    font-size: 18px;
  }
  span{
    color: #999;
  }
}
.guess{
  text-align: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 0.1rem;
  margin-top: 0.2rem;
  h3{
    width: 25%;
    margin-left: 38%;
    border-bottom: 2px solid #666;
    font-size: 18px;
  }
  span{
    color: #999;
  }
}
.lateral-sliding {
  display: flex;
  overflow-y: hidden;
  overflow-x: scroll;
  .lateral-sliding-item {
    display: flex;
    // margin-right: 8px;
    margin-left: 0.1rem;
    .each-img {
      // width: 2rem;
      width: 100%;
      height: 2rem;
      p{
        // text-align: center;
        margin-left: 0.1rem;
        line-height: 0.3rem;
      }
      img{
        width:190px;
        height:144px;
      }
      .price{
        color:#019bdf;
        // margin-right:120px;
        line-height: 0.3rem;
        margin-left: 0.1rem;
      }
      .icon-tianjia{
        font-size: 20px;
        float: right;
        margin-right: 0.1rem;
      }
    }
  }
}
.tel {
  margin-top: 0.2rem;
  margin-bottom: 0.4rem;
  .toptel {
    img {
      width: 0.35rem;
      height: 0.35rem;
      border-radius: 50%;
      margin: 0 0.2rem;
    }
    span {
      font-size: 16px;
    }
  }
  .bottel {
    margin: 0.2rem auto;
    img {
      width: 0.15rem;
      height: 0.15rem;
      margin-left: 0.3rem;
    }
    .clock {
      margin-left: 0.55rem;
    }
    span {
      margin-left: 0.2rem;
    }
  }
  .address {
    position: relative;
    margin-top:0.2rem;
    img {
      width: 0.15rem;
      height: 0.15rem;
      margin-left: 0.3rem;
      margin-top: 0.05rem;
    }
    span {
      position: absolute;
      left: 0.7rem;
      top: 0.05rem;
    }
  }
  .line {
    border-width: 1px;
    border-bottom-style: dotted;
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    width: 90%;
    border-bottom-color: rgb(213, 213, 222);
    position: absolute;
    left: 0.2rem;
    top:6.6rem;
  }
}
.login-more{
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 16px;
  a {
  color: #019bfd;
  }
}
</style>
