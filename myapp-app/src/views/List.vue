<template>
  <div class="box">
    <header class="header"><Back/></header>
    <ul class="list">
      <li class="proitem" v-for="(item) of prolist" :key="item.proid" @click="toDetail(item.houseid)">
        <div class="itemimg">
          <img :src="item.houseimg" alt="">
        </div>
        <div class="iteminfo">
          <h2>{{ item.housename }}</h2>
          <!-- <h3>{{ item.detail }}</h3> -->
          <span class="pro-price">{{ '￥' + item.price }}</span>
          <span class="iconfont icon-tianjia"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '@/utils/request'
import Back from '@/components/Back.vue'

export default {
  components: {
    Back
  },
  data () {
    return {
      prolist: []
    }
  },
  created () {
    var { type } = this.$route.query
    console.log(type)
    axios.get('/list?type=' + type).then(res => {
      console.log(res.data.data)
      this.prolist = res.data.data
    })
  },
  methods: {
    backtohome () {
      this.$router.go(-1)
    },
    toDetail (houseid) {
      this.$router.push('/shop?houseid=' + houseid)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';
.list {
  @include rect(100%, auto);
  header{
    height:0.44rem;
    background-color: #eeeeee;
    .icon-zuojiantou{
      font-size:0.25rem;
    }
    }
  .van-popup{
    overflow: visible;
    .show-img{
      height:100px;
      width:100px;
      position: absolute;
      left:5px;
      top:-20px;
      z-index: 20;
    }
    .itemlist-price{
      margin-left: 120px;
    }
    .good-housename{
      margin-left: 120px;
    }
    .good-number-box{
      @include flexbox();
      margin-top: 40px;
      .goods-plus{
        font-size: 14px;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        display: inline-block;
        border: 1px solid #ebebeb;
        width: .2rem;
        line-height: .2rem;
        min-height: .2rem;
        height: .2rem;
        max-height: .2rem;
        padding: 0;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        color: #c9c9c9;
      }
      .goods-count{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        font-family: sans-serif;
        margin: 0;
        overflow: visible;
        display: inline-block;
        border: 1px solid #ebebeb;
        width: .2rem;
        line-height: .2rem;
        min-height: .2rem;
        height: .2rem;
        max-height: .2rem;
        padding: 0;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        font-size: .15rem;
        color: #333;
      }
      .goods-minus{
        font-size: 14px;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        display: inline-block;
        border: 1px solid #ebebeb;
        width: .2rem;
        line-height: .2rem;
        min-height: .2rem;
        height: .2rem;
        max-height: .2rem;
        padding: 0;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        color: #c9c9c9;
        margin-left: 60%;
      }
    }
    .add-shoppingcart{
      line-height: .5rem;
      color: #fff;
      margin-top:48px;
      text-align: center;
      font-size: .2rem;
      -webkit-tap-highlight-color: rgba(0,0,0,0);
      flex: 1;
      background: #019bdf;
    }
  }
  .proitem {
    @include rect(100%, 1rem);
    @include border(0 0 1px 0, #efefef, solid); // 设定的是一个物理像素
    @include flexbox();
    .itemimg {
      @include rect(1.1rem, 1rem);
      margin-left: 0.05rem;
      img {
        @include rect(1rem, 0.9rem);
        @include border(1px, #019bdf, solid);
        @include margin(0.05rem);
        @include display(block);
      }
    }
    .iteminfo {
      @include flex();
      position: relative;
      margin-left: 0.05rem;
      h2 {
        line-height: 0.3rem;
        color: #333;
        font-size: 15px;
        margin-top: 0.05rem;
      }
      .pro-price{
        color:#019bdf;
        position: absolute;
        bottom: 0;
        z-index: 5;
        font-size: 16px;
      }
      .icon-tianjia{
        font-size: 25px;
        position:absolute;
        right: 10px;
        bottom: 0;
      }
    }
  }
}
</style>
