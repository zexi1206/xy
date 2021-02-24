<template>
  <ul class="prolist">
    <li class="proitem" v-for="(item) of prolist" :key="item.proid" @click="toDetail(item.houseid)">
      <div class="itemimg">
        <img :src="item.houseimg" alt="">
      </div>
      <div class="iteminfo">
        <h2>{{ item.housename }}</h2>
        <!-- <h3>{{ item.detail }}</h3> -->
        <span class="pro-price">{{ '￥' + item.price }}</span>
        <span class="iconfont icon-tianjia" @click.stop="addShoppingcart(item)"></span>
      </div>
    </li>
    <van-popup
    v-model="show"
    round
    position="bottom"
    :style="{ height: '30%' }"
    >
    <img :src="itemlist.houseimg" class="show-img"/><span class="itemlist-price">{{'￥'+itemlist.price}}</span>
    <p class="good-housename">{{itemlist.housename}}</p>
    <div class="buy">
      <div class="good-number-box pull-right"><span>购买数量：</span><div class="goods-minus"  @click.stop="minus">-</div><input class="goods-count" v-model="num"/><div class="goods-plus" @click.stop="plus">+</div></div>
    </div>
    <div class="add-shoppingcart" @click.stop="Shoppingcart">加入购物车</div>
  </van-popup>
  </ul>
</template>

<script>
import axios from '@/utils/request'
import Vue from 'vue'
import { Popup, Toast } from 'vant'
Vue.use(Toast)
Vue.use(Popup)
export default {
  props: ['prolist'],
  data () {
    return {
      show: false,
      num: 1,
      itemlist: {
        houseimg: '',
        price: '',
        houseid: '',
        detail: ''
      }
    }
  },
  methods: {
    toDetail (houseid) {
      this.$router.push('/shop?houseid=' + houseid)
    },
    addShoppingcart (item) {
      this.itemlist = item
      this.show = true
    },
    Shoppingcart (item) {
      var userid = localStorage.getItem('userid')
      console.log(this.itemlist.houseid)
      console.log(this.num)
      console.log(userid)
      axios.get('/cart/add?userid=' + userid + '&houseid=' + this.itemlist.houseid + '&num=' + this.num).then(res => {
        Toast('加入购物车成功')
        console.log(res.data)
      })
    },
    plus () {
      if (this.num < 999) {
        this.num++
      }
    },
    minus () {
      if (this.num >= 2) {
        this.num--
      }
    }
  },
  watch: {
    show: function (newName, oldName) {
      if (newName === false) {
        this.num = 1
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.prolist {
  @include rect(100%, auto);
  .van-popup{
    overflow: visible;
    .buy {
      margin-top: 0.3rem;
    }
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
      color: #019bdf;
      font-size: 16px;
      line-height: 45px;
    }
    .good-housename{
      margin-left: 120px;

    }
    .good-number-box{
      @include flexbox();
      padding-top: 0.1rem;
      border-top: 1px solid rgb(236, 236, 236);
      span {
        margin-left: 0.1rem;
        font-size: 13px;
        color: #333;
      }
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
      margin-top: 20px;
      text-align: center;
      font-size: 18px;
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
        font-size: 16px;
        margin-top: 0.05rem;
        font-weight: normal;
      }
      .pro-price{
        color:#019bdf;
        position: absolute;
        bottom: 0;
        z-index: 5;
        font-size: 16px;
        line-height: 36px;
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
<style>
.van-popup--bottom.van-popup--round {
  position: fixed;
  bottom: 0.5rem;
  border-radius: 0;
  height: auto!important;
}
.van-overlay {
  position: fixed;
  top: -50px;
}

</style>
