<template>
      <div class="box">
        <header class="header">预约界面</header>
        <div class="content">
          <van-loading type="spinner" color="#1989fa" v-show='loadflag' id="loading"/>
          <div class="smallbox1" v-for="item of this.sublist" :key="item.houseid" @click="toDetail(item.houseid)">
            <img :src='item.houseimg' alt="" class="bgimg">
            <img src="http://img.weiye.me/zcimgdir/album/file_594a1843819f4.png" alt="" class="yellow-img">
            <span>{{item.youhui}}</span>
            <div>￥{{item.price}}起</div>
            <p>{{item.housename}}</p>
            <button></button>
          </div>
        </div>
      </div>
</template>
<style lang="scss" scoped>
.content {
  overflow: hidden;
  #loading{
    position: fixed;
    top: 50%;
    left: 50%;
  }
}
.smallbox1{
  margin: 0 auto;
  margin-bottom: 0.2rem;
  margin-top: 0.15rem;
  width: 88%;
  position: relative;
  // width: 3.72rem;
  height: 1.61rem;
  .bgimg {
  width: 100%;
  height: 100%;
  border-radius: 3%;
  }
  .yellow-img {
    position: absolute;
    top:0;
    left: 0.2rem;
    width: 0.64rem;
    height: 0.36rem;
  }
  span {
    background-color: rgba(0, 0, 0, 0);
    border-color: rgb(34, 34, 34);
    border-style: none;
    border-width: 0.02rem;
    color: rgb(243, 243, 243);
    font-size: 0.13rem;
    height: 0.19rem;
    line-height: 0.19rem;
    margin-left: 0px;
    margin-top: 0px;
    opacity: 1;
    text-align: left;
    position: absolute;
    left: 0.26rem;
    top: 0.06rem;
    margin-right: 0px;
  }
  div {
    background-color: rgba(0, 0, 0, 0);
    border-color: rgb(34, 34, 34);
    border-style: none;
    border-width: 0.02rem;
    color: rgb(243, 243, 243);
    font-size: 0.14rem;
    height: 0.19rem;
    line-height: 0.19rem;
    margin-left: 0px;
    margin-top: 0px;
    opacity: 1;
    text-align: left;
    position: absolute;
    left: 0.39rem;
    top: 1.22rem;
    margin-right: 0px;
    z-index: 222;
  }
  p {
    background-color: rgba(0, 0, 0, 0);
    border-color: rgb(34, 34, 34);
    border-style: none;
    border-width: 0.02rem;
    color: rgb(255, 255, 255);
    font-size: 18px;
    height: 0.19rem;
    line-height: 0.19rem;
    margin-left: 0px;
    margin-top: 0px;
    opacity: 1;
    text-align: left;
    position: absolute;
    left: 1.9rem;
    top: 1.22rem;
    margin-right: 0px;
  }
  button {
    width: 0.93rem;
    height: 0.32rem;
    background-color: #019bdf;
    border-radius: 0.08rem;
    position: absolute;
    top: 1.15rem;
    left: 0.22rem;
    border: 0;
  }
}

</style>
<script>
import Vue from 'vue'
import { Loading } from 'vant'
import axios from '@/utils/request'

Vue.use(Loading)
export default {
  methods: {
    toDetail (houseid) {
      this.$router.push('/yu?houseid=' + houseid)
    }
  },
  data () {
    return {
      sublist: [],
      loadflag: true
    }
  },
  created () {
    axios.get('/subscribe?type=xiyu').then(res => {
      this.loadflag = false
      this.sublist = res.data.data
      // this.loadingflag = false
      // this.sublist.splice(0, 26)
      // console.log(this.sublist)
    })
  }
  // watch: {
  //   loadflag (newval, oldval) {
  //     if (newval > 2) {
  //       this.topflag = true
  //     } else {
  //       this.topflag = false
  //     }
  //   }
  // }
}
</script>
