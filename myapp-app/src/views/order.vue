<template>
  <div class="box">
    <!-- 头部 -->
    <header class="header"><Back/>确认订单</header>
    <div class="content">
      <div class="pick">
        <span class="iconfont icon-kuaidi">取货方式</span>
        <span class="pull-right ">快递</span>
      </div>
      <ul v-if="flag" class="address-order">
        <li class="iconfont icon-dizhi ads"></li>
        <li>
          <p class="name">{{ name }} ： {{ tel }}</p>
          <p>{{ address }}</p>
        </li>
        <li class="ads-go" @click="toaddresslist"> &gt;</li>
      </ul>
      <div v-else class="no-address">没有默认地址
        <a @click="toaddresslist">添加地址</a>
      </div>
      <div><img src="http://cdn.jisuapp.cn/static/webapp/images/xcx-goods/goods-address-bg.png" alt=""></div>
      <ul class="prolist" >
        <li class="proitem" v-for="item of orderlist" :key="item.proid" >
          <div class="itemimg">
            <img :src="item.houseimg" alt="">
          </div>
          <div class="iteminfo">
            <h2>{{ item.housename }}</h2>
            <h3>数量：{{ item.num }}</h3>
            <p class="price">单价：{{ '￥' + item.price }}</p>
          </div>
        </li>
      </ul>
    </div>
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="确认订单"
      @submit="onSubmit"
    >
      <!-- <span slot="tip">
        你的收货地址不支持同城送,  <a @click="toaddresslist">修改地址</a>
      </span> -->
    </van-submit-bar>
  </div>
</template>
<script>
import axios from '@/utils/request'
import Back from '@/components/Back.vue'
import Vue from 'vue'
import { SubmitBar } from 'vant'

Vue.use(SubmitBar)
export default {
  components: {
    Back
  },
  data () {
    return {
      orderlist: [],
      addresslist: [],
      flag: false,
      list: [],
      address: '',
      tel: '',
      name: '',
      totalPrice: 0
    }
  },
  methods: {
    toaddresslist () {
      this.$router.push('/addresslist')
    },
    onSubmit () {
      var { orderid } = this.$route.query
      this.$router.push('/pay?orderid=' + orderid)
    }
  },
  created () {
    console.log(this.$route.query)
    const userid = localStorage.getItem('userid')
    console.log(userid)
    axios.get('/order?userid=' + userid + '&orderid=' + this.$route.query.orderid).then(res => {
      console.log('order', res.data.data[0].list)
      this.orderlist = res.data.data[0].list
      // console.log(parseInt(res.data.data[0].list[1].price))
      // console.log(parseInt(res.data.data[0].list[1].num))
      for (var i in this.orderlist) {
        this.totalPrice += this.orderlist[i].num * this.orderlist[i].price
      }
      localStorage.setItem('totalPrice', this.totalPrice)
    })
    axios.get('/address/addresslist?userid=' + userid).then(res => {
      // console.log(res.data)
      if (res.data.code !== '000') {
        for (let i = 0; i < res.data.data.length; i++) {
          // console.log(res.data.data[i].isDefault)
          if (res.data.data[i].isDefault === 1) {
            this.flag = true
            this.defaultaddress = i
            // console.log(res.data.data[i])
            this.list.push(res.data.data[i])
            this.address = this.list[0].address
            this.tel = this.list[0].tel
            this.name = this.list[0].name
          } else {
            this.list.push(res.data.data[i])
            this.address = this.list[0].address
            this.tel = this.list[0].tel
            this.name = this.list[0].name
          }
        }
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.content {
  background: #edebec!important;
  .pick {
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    justify-items: center;
    line-height: 0.4rem;
    .icon-kuaidi {
      margin-left: 0.1rem;
      font-size: 14px;
    }
    .pull-right {
      margin-right: 0.1rem;
    }
  }
  div {
    background: #fff;
    margin-bottom: 0.1rem;
    width: 100%;
    img {
      width: 100%;
    }
  }
}
.address-order {
  width: 100%;
  height: 0.7rem;
  background: #fff;
    .ads {
      width: 0.4rem;
      text-align: center;
      height: 100%;
      line-height: 0.7rem;
      float: left;
    }
    li {
      height: 0.7rem;
      float: left;
      .name {
        margin-top: 0.13rem;
      }
      p {
        line-height: 0.23rem;
      }
    }
    .ads-go {
      float: right;
      line-height: 0.7rem;
      margin-right: 0.2rem;
    }
  }
  .price {
    color: #019bfd;
    line-height: 0.3rem;
  }
  h3 {
    font-weight: normal;
  }
  .no-address {
    line-height: 0.5rem;
    padding-left: 0.12rem;
  }
  .no-address a {
    color: #019bfd;
  }
  .van-submit-bar__tip span a {
    color: #019bfd;
  }
  .prolist {
    li {
      background: #fff;
      margin-bottom: 0.05rem;
    }
  }
  .van-submit-bar__price {
    color: #019bfd;
  }
</style>
