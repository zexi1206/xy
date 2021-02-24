<template>
      <div class="box">
        <header class="header"><Back/>商品详情</header>
        <div class="content">
          <div class="shop" v-if="flag" :key="itemlist[0].houseid">
            <img :src="itemlist[0].houseimg" @click="Imagechange({images: [itemlist[0].houseimg]})">
            <p class="house-name">{{itemlist[0].housename}}</p>
            <p class="price">{{'￥'+itemlist[0].price}}</p>
            <p>配送费用：包邮</p>
            <p>取货方式：快递</p>
            <P>商品详情：
            {{itemlist[0].detail}}</p>
            <p class="interval"><span>---详情---</span></p>
            <p>产品详情：{{itemlist[0].housename}}</p>
            <img :src="itemlist[0].houseimg">
          </div>
          <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onshoppingcar" />
            <van-goods-action-button type="warning" text="加入购物车" @click="onClickButton" />
            <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" />
          </van-goods-action>
        </div>
      </div>
</template>

<script>
import axios from '@/utils/request'

import Vue from 'vue'
import Back from '@/components/Back.vue'
import {
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ImagePreview,
  Toast
} from 'vant'
Vue.use(ImagePreview)
Vue.use(Toast)
Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
export default {
  components: {
    Back
  },
  data () {
    return {
      itemlist: [],
      flag: false
    }
  },
  created () {
    var { houseid } = this.$route.query
    axios.get('/shop?houseid=' + houseid).then(res => {
      this.itemlist = res.data.data
      this.flag = true
    })
  },
  methods: {
    Imagechange (item) {
      ImagePreview(item)
    },
    onClickIcon () {
      Toast('暂无')
    },
    onshoppingcar () {
      var userid = localStorage.getItem('userid')
      this.$router.push({ path: '/cart?userid=' + userid })
    },
    onClickButton () {
      var userid = localStorage.getItem('userid')
      // console.log(this.itemlist[0].houseid)
      // console.log(this.num)
      // console.log(userid)
      axios.get('/cart/add?userid=' + userid + '&houseid=' + this.itemlist[0].houseid).then(res => {
        Toast('加入购物车成功')
        console.log(res.data)
      })
      Toast('加入购物车成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.shop{
  img{
      width: 100%;
      height: 2.7rem;
    }
  p {
      margin-bottom: 0.06rem;
      font-size: 14px;
      color: #444;
      margin-left: 0.16rem;
    }
  .house-name{
      color: #222;
      font-size: 22px;
      margin-top: 0.2rem;
  }
  .price{
    color: #019bdf;
    font-size: 26px;
  }
  .interval{
    width: 100%;
    height: 0.4rem;
    background-color: #eee;
    text-align: center;
    position: relative;
    margin-left: 0;
    span{
      text-align: center;
      height: 0.2rem;
      position: absolute;
      top: 0.08rem;
      left: 39%;
      color: #888;
    }
  }
  }
.van-image-preview__image{
  .van-image__img{
    height:310px;
    margin-top:90px;
   }
  }
  .van-goods-action {
    bottom: -3px!important;
  }
</style>
