<template>
  <div class="box">
    <header class="header">
      <Back/>
    <span slot="left"></span>购物车<span slot="right">管理</span>
    </header>
    <div class="content car-content">
      <img src="/img/carnull.png" v-if= "nullcar" class="nullcar">
      <div v-for="(item,index) of shoplist" :key="item.houseid" v-else>
        <van-card
        :num="shoplist[index].num"
        :price="shoplist[index].price"
        :title="shoplist[index].housename"
        :thumb="shoplist[index].houseimg"
        >
          <div slot="footer">
            <span class="iconfont icon-shanchu del" @click="deleteItem(item, index)"></span>
              <div>
              <button class="add" @click="add(index)">+</button>
              <button class="minus" @click="minus(index)">-</button>
              </div>
              <span class="pay">预付：￥{{price(index)}}</span>
              <input type="checkbox" v-model="item.flag" name="gouxuan" class="gouxuan" @change="changeFlag(item)"/>
          </div>
        </van-card>
      </div>
    </div>
      <van-submit-bar
      button-text="提交订单"
      @submit="onSubmit"
      >
      <input type="checkbox" v-model="all" @change="selectAll"/>
      <p class="all">全选</p>
      <!-- <span slot="tip">
          请确认您的收货地址是否正确, <a @click="toaddresslist">修改地址</a>
      </span> -->
      <span class="allpay">总价：{{totalPrice}}</span>
      </van-submit-bar>
  </div>
</template>

<script>
import axios from '@/utils/request'
import Back from '@/components/Back.vue'
import Vue from 'vue'
import { Card, SubmitBar, Toast } from 'vant'
Vue.use(Card)
Vue.use(SubmitBar)
export default {
  components: {
    Back
  },
  data () {
    return {
      shoplist: [],
      all: true,
      nullcar: false,
      length: 0
    }
  },
  methods: {
    // toaddresslist () {
    //   this.$router.push('/addresslist')
    // },
    onSubmit () {
      this.arr = []
      this.shoplist.map(item => {
        if (item.flag) {
          this.arr.push(item)
        }
      })
      console.log(this.arr)
      if (this.arr.length === 0) {
        Toast('请先添加商品')
        return
      }
      // 将此数据提交到服务器 ----
      axios.get('/order/add?str=' + JSON.stringify(this.arr) + '&userid=' + localStorage.getItem('userid')).then(res => {
        console.log('order', res.data)
        this.$router.push('/order?orderid=' + res.data.data.orderid)
      })
    },
    minus (index) {
      if (this.shoplist[index].num > 1) {
        this.shoplist[index].num--
        console.log(index)
      }
    },
    add (index) {
      if (this.shoplist[index].num <= 99) {
        this.shoplist[index].num++
        console.log(index)
      }
    },
    deleteItem (item, index) {
      var userid = localStorage.getItem('userid')
      this.length--
      console.log(this.length)
      axios.get('/cart/delete?userid=' + userid + '&houseid=' + item.houseid).then(res => {
        this.shoplist.splice(index, 1)
      })
    },
    changeFlag (item) {
      console.log(item)
      if (item.flag) {
        let b = this.shoplist.every(item => {
          return item.flag === true
        })
        if (b) { // 全部被选中
          this.all = true
        } else {
          this.all = false
        }
      } else {
        this.all = false
      }
    },
    selectAll () {
      if (this.all) {
        this.shoplist.map(item => {
          item.flag = true
        })
      } else {
        this.shoplist.map(item => {
          item.flag = false
        })
      }
    }
  },
  created () {
    var { userid } = this.$route.query
    axios('/cart?userid=' + userid).then(res => {
      console.log(res)
      if (res.data.code === '11000') {
        this.nullcar = true
      } else {
        this.nullcar = false
        let arr = res.data.data
        arr.map(item => {
          item.flag = true
        })
        this.shoplist = arr
        this.length = arr.length
        // console.log(this.length)
      }
    })
  },
  watch: {
    shoplist: {
      handler (newVal, oldVal) {
        console.log(this.length)
        if (this.length === 0) {
          this.nullcar = true
        }
      },
      deep: true
    }
  },
  computed: {
    price: function () {
      return function (index) {
        return this.shoplist[index].price * this.shoplist[index].num
      }
    },
    totalPrice () {
      let totalPrice = 0
      this.shoplist.map((item) => {
        item.flag ? totalPrice += item.num * item.price : totalPrice += 0
      })
      return totalPrice.toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
.add {
  position: absolute;
  top: 0.43rem;
  right: 0.46rem;
  width: 0.2rem;
  height: 0.2rem;
  background-color: #fff;
  border: 1px solid #ccc;
}
.cart-num {
  position:absolute;
  top:0.43rem;
  right:0.75rem;
}
.car-content {
  background-color: #edebec;
  background:#edebec;
}
.car-content div {
  margin-bottom: 0.05rem;
}
.nullcar{
  position: fixed;
  top:34%;
  left:24%;
}
.minus {
  position: absolute;
  top: 0.43rem;
  right: 0.9rem;
  width: 0.2rem;
  height: 0.2rem;
  background-color: #fff;
  border: 1px solid #ccc;
}
.van-card__num {
  position: absolute;
  top: 0.34rem;
  right: 0.53rem;
}
.del {
  width: 0.7rem;
  height: 0.3rem;
  position: absolute;
  top: 0.1rem;
  right: 0.15rem;
}
.pay {
  position: absolute;
  top: 0.8rem;
  right: 0.55rem;
  font-size: 14px;
  color: #019bfd;
  line-height: 0.2rem;
}
.gouxuan {
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  top: 0.82rem;
  right: 0.15rem;
}
.van-card__title {
  max-height: 60px;
  line-height: 17px;
  font-size: 17px;
  position: absolute;
  top: 0.2rem;
  left: 0.05rem;
}
.van-card__price {
  position: absolute;
  top: 0.5rem;
  left: 0.05rem;
  font-size: 16px;
  color: #019bfd;
}
.van-submit-bar__bar {
  margin-bottom: 0!important;
  input {
    position: absolute;
    // top: 0.5rem;
    left: 0.1rem;
    width: 0.2rem;
    height: 0.2rem;
  }
  p{
    position: absolute;
    // top: 0.48rem;
    left: 0.3rem;
    font-size: 16px;
    font-weight: 600;
  }
  .allpay {
    position: absolute;
    // top: 0.45rem;
    left: 1.1rem;
    font-size: 20px;
    color: #019bfd;
  }
}
.address-cart {
  width: 100%;
  height: 0.7rem;
  background: #fff;
  margin-bottom: 0.05rem;
  ul {
    .ads {
      width: 0.6rem;
      text-align: center;
      height: 100%;
      line-height: 0.7rem;
      float: left;
    }
    li {
      height: 0.7rem;
      float: left;
      p {
        margin-left: 0.2rem;
        line-height: 0.35rem;
      }
    }
    .ads-go {
      float: right;
      line-height: 0.7rem;
      margin-right: 0.2rem;
    }
  }
}
.van-submit-bar{
  margin-bottom: 0!important;
 }
 .van-submit-bar__tip {
   background: #fff!important;
   border-top: 1px solid #eee;
 }
.van-button--danger {
  background-image: linear-gradient(to right,#019bfd,#01b9ff);
  border: #019bfd;
}
</style>
