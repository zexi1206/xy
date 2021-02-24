<template>
  <div class="box">
    <header class="header"><Back/>支付订单</header>
    <div class="content" @click.stop="other">
      <div class="pay-price">
        <div>
          <p>剩余时间：</p>
          <van-count-down :time="time" />
        </div>
        <p>订单总价：￥{{ totalPrice }}</p>
      </div>
      <van-radio-group v-model="radio">
        <van-cell-group>
          <van-cell title="支付宝" clickable @click="radio = '1'">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-zhifubao"></use>
            </svg>
            <van-radio slot="right-icon" name="1" />
          </van-cell>
          <van-cell title="微信" clickable @click="radio = '2'">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-weixin"></use>
            </svg>
            <van-radio slot="right-icon" name="2" />
          </van-cell>
          <van-cell title="花呗" clickable @click="radio = '3'">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-huabei"></use>
            </svg>
            <van-radio slot="right-icon" name="3" />
          </van-cell>
          <van-cell title="银联" clickable @click="radio = '4'">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yinlian"></use>
            </svg>
            <van-radio slot="right-icon" name="4" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <button class="pay-now" @click.stop="pay">确认支付</button>
      <van-password-input
        :value="value"
        :length="6"
        :gutter="15"
      />
    </div>
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
import axios from '@/utils/request'
import Back from '@/components/Back.vue'
import Vue from 'vue'
import { RadioGroup, Radio, CountDown, PasswordInput, NumberKeyboard, Toast } from 'vant'
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(CountDown).use(Toast)
Vue.use(PasswordInput).use(NumberKeyboard)
export default {
  components: {
    Back
  },
  data () {
    return {
      radio: '1',
      time: 30 * 60 * 60 * 1000,
      totalprice: '',
      value: '',
      showKeyboard: false
    }
  },
  created () {
    this.totalPrice = localStorage.getItem('totalPrice')
  },
  methods: {
    onInput (key) {
      this.value = (this.value + key).slice(0, 6)
      if (this.value === '121212') {
        Toast.success('支付成功')
        this.showKeyboard = false
        this.value = ''
        this.$router.push('/')
        console.log(this.value)
      } else if (this.value.length === 6 || !this.value === '121212') {
        Toast('密码错误')
        this.value = ''
      }
    },
    onDelete () {
      this.value = this.value.slice(0, this.value.length - 1)
    },
    pay () {
      var { orderid } = this.$route.query
      console.log(orderid)
      axios('/order/update?orderid=' + orderid).then(res => {
        console.log(res)
      })
      this.showKeyboard = true
    },
    other () {
      this.showKeyboard = false
    }
  }
}
</script>
<style lang="scss" scoped>
.pay-price {
  div{
    display: flex;
    justify-content: center;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 16px;
  }
  p {
    text-align: center;
    margin-bottom: 0.2rem;
  }
}

.pay-now {
  outline: none;
  border: 0;
  display: block;
  background-color:#019bfd;
  width: 86%;
  margin: 10px 7%;
  margin-top: 20px;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
}
.van-cell__title {
  margin-left: 14%;
}
.van-cell__value {
  left: -55%;
}
.van-radio {
  margin-right: 0.1rem!important;
}

.icon {
  font-size: 24px;
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  float: left;
  position: absolute;
  left: 0.2rem;
}
.van-button--danger {
  background-image: linear-gradient(to right,#019bfd,#01b9ff)!important;
  border: #019bfd;
}
.van-submit-bar__button {
  background-image: linear-gradient(to right,#019bfd,#01b9ff)!important;
  border: #019bfd;
}

</style>
