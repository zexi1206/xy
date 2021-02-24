<template>
  <div class="box">
    <header class="header"><Back/>预约</header>
    <div class="content yu-content">
      <div class="shop" v-if="flag" :key="itemlist[0].houseid">
        <img :src="itemlist[0].houseimg" @click="Imagechange({
  images: [itemlist[0].houseimg]})">
        <p class="house-name">{{itemlist[0].housename}}</p>
        <p class="price">{{'￥'+itemlist[0].price}}</p>
        <p>预约时长：{{itemlist[0].duration}}</p>
        <p>预约时段:{{itemlist[0].time}}</p>
        <P>预约日期:{{itemlist[0].date}}</P>
        <P>使用方式:{{itemlist[0].ways}}</P>
        <p class="interval"><span>---详情---</span></p>
        <p>产品详情：{{itemlist[0].housename}}</p>
        <img :src="itemlist[0].houseimg">
      </div>
    </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服"/>
        <van-goods-action-icon icon="cart-o" text="预约详情" @click="onClickIcon" />
        <van-goods-action-button type="warning" text="立即预约" @click="onyuyue" />
      </van-goods-action>
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
Vue.use(GoodsAction)
Vue.use(GoodsActionIcon)
Vue.use(GoodsActionButton)
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
    console.log(this.flag)
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
      this.$router.push('/Yuyuelist')
    },
    onshoppingcar () {
      var userid = localStorage.getItem('userid')
      this.$router.push({ path: '/path?userid=' + userid })
    },
    onyuyue () {
      this.$router.push({ path: '/yulist?houseid=' + this.itemlist[0].houseid })
    }
  }
}
</script>

<style lang="scss" scoped>
.shop{
  img{
      width:100%;
      height:3.5rem;
    }
  p {
      margin-bottom: 0.06rem;
      font-size: 14px;
      color: #999;
      margin-left: 0.16rem;
    }
  .house-name{
      color: #222;
      font-size: 22px;
      margin-top: 0.1rem;
  }
  .price{
    color: #019bdf;
    font-size: 26px;
  }
  .interval{
    width: 100%;
    height: 0.4rem;
    background-color: #ccc;
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

</style>
<style>
.yu-content {
  padding-bottom: 1rem;
}
.smallbox1 {
    width: 94%!important;
    margin-bottom: 0!important;
  }
.smallbox1 p {
  font-size: 18px!important;
  left: 2.1rem!important;
}
</style>
