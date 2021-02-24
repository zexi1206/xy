<template>
  <div class="contain dingdan-contain">
  <header class="header" id="din-header">
    <span class="iconfont icon-fanhui" @click="back">返回</span></header>
    <div class="dingdan">
      <van-search
        v-model="value"
        placeholder="请输入订单号"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-tabs v-model="active" sticky>
        <van-tab title="全部">
          <van-panel v-for="item of itemlist" :key='item.orderid'>
            <div class='orderBox'>
              <div class='orderImg'>
                <img :src='item.list[0].houseimg'>
              </div>
              <div class='orderTips'>
                <ul>
                  <li>订单编号：201911100521-2</li>
                  <li>{{item.list[0].housename}}</li>
                  <li>x {{item.list[0].num}}</li>
                  <li>¥ {{item.list[0].num*item.list[0].price}}</li>
                  <li>
                    <!-- <button>去评价</button>
                    <button>删除订单</button> -->
                  </li>
                </ul>
              </div>
            </div>
          </van-panel>
        </van-tab>
        <van-tab title="待付款">
              <van-panel v-for="(item, index) of itemlist" :key='item.orderid'>
            <div class='orderBox'>
              <div class='orderImg'>
                <img :src='item.list[0].houseimg'>
              </div>
              <div class='orderTips'>
                <ul>
                  <li>订单编号：201911100521-2</li>
                  <li>{{item.list[0].housename}}</li>
                  <li>x {{item.list[0].num}}</li>
                  <li>¥ {{item.list[0].num*item.list[0].price}}</li>
                  <li>
                    <button>去付款</button>
                    <button @click="del(item.orderid, index)">取消订单</button>
                  </li>
                </ul>
              </div>
            </div>
          </van-panel>
        </van-tab>
        <van-tab title="待收货">
                    <van-panel v-for="(item, index) of itemlist" :key='item.orderid'>
            <div class='orderBox'>
              <div class='orderImg'>
                <img :src='item.list[0].houseimg'>
              </div>
              <div class='orderTips'>
                <ul>
                  <li>订单编号：201911100521-2</li>
                  <li>{{item.list[0].housename}}</li>
                  <li>x {{item.list[0].num}}</li>
                  <li>¥ {{item.list[0].num*item.list[0].price}}</li>
                  <li>
                    <button @click="good(item.orderid,index)">确认收货</button>
                    <button @click="del(item.orderid, index)">删除订单</button>
                  </li>
                </ul>
              </div>
            </div>
          </van-panel>
        </van-tab>
        <van-tab title="待评价">
                   <van-panel v-for="(item, index) of itemlist" :key='item.orderid'>
            <div class='orderBox'>
              <div class='orderImg'>
                <img :src='item.list[0].houseimg'>
              </div>
              <div class='orderTips'>
                <ul>
                  <li>订单编号：201911100521-2</li>
                  <li>{{item.list[0].housename}}</li>
                  <li>x {{item.list[0].num}}</li>
                  <li>¥ {{item.list[0].num*item.list[0].price}}</li>
                  <li>
                    <button>去评价</button>
                    <button @click="del(item.orderid, index)">删除订单</button>
                  </li>
                </ul>
              </div>
            </div>
          </van-panel>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from '@/utils/request'
import { Tab, Tabs, Search, Panel, Button, Toast } from 'vant'
Vue.use(Panel)
Vue.use(Button)
Vue.use(Tab).use(Tabs).use(Search).use(Toast)
export default {
  data () {
    return {
      active: '',
      value: '',
      userid: '',
      itemlist: []
    }
  },
  created () {
    let { userid, num } = this.$route.query
    this.userid = userid
    this.active = (num - 0)
    if (this.active === 0) {
      axios.get('/order/all?userid=' + userid).then(res => {
        console.log(res.data.data)
      })
    } else {
      axios.get('/order/dindan?userid=' + userid + '&status=' + this.active).then(res => {
        console.log(res.data.data)
      })
    }
  },
  methods: {
    onSearch () {
      console.log(2)
    },
    back () {
      this.$router.go(-1)
    },
    del (val, index) {
      var orderid = val
      console.log(val)
      axios('/order/delete?orderid=' + orderid).then(res => {
        // console.log(res)
        this.itemlist.splice(index, 1)
        Toast('取消成功')
      })
    },
    good (val, index) {
      axios('/order/update1?oriderid=' + val).then(res => {
        console.log(res)
      })
    }
  },
  watch: {
    active: {
      handler (newVal, oldVal) {
        if (this.active === 0) {
          axios.get('/order/all?userid=' + this.userid).then(res => {
            this.itemlist = res.data.data
            if (this.itemlist.length === 0) {
              Toast('暂无信息')
            }
          })
        } else {
          axios.get('/order/dindan?userid=' + this.userid + '&status=' + this.active).then(res => {
            this.itemlist = res.data.data
            if (this.itemlist.length === 0) {
              Toast('暂无信息')
            }
            console.log(res.data.data)
          })
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.dingdan-contain{
  overflow: auto;
  #dingdan-header{
    height:0.44rem;
  }
}
#din-header{
  background-image: linear-gradient(to right,#019bfd,#01b9ff);
  height: 0.41rem;
  text-align: center;
  line-height: 0.41rem;
  font-size: 16px;
  color: #fff;
  // p {
  //   margin-left: -0.2rem;
  // }
  .icon-fanhui{
    float: left;
    font-size: 16px;
    margin-left:5px;
    line-height: 0.41rem;
    margin-left: 0.2rem;
  }
}
.dingdan-jiemian{
  @include flexbox();
  img{
    width:90px;
    height:90px;
  }
}
.van-panel__content{
  @include rect(100%, 1.6rem);
  @include flexbox();
  @include justify-content();
  @include align-items();
  .orderBox{
    @include flexbox();
    @include justify-content();
    @include align-items();
    .orderImg{
      @include rect(50%, 100%);
      @include flexbox();
      @include justify-content();
      @include align-items();
      overflow:hidden;
      img{
        @include rect(80%, 80%);
        border-radius:.1rem;
      }
    }
    .orderTips{
      @include rect(50%, 100%);
      ul{
        li{
          @include rect(100%, .24rem);
          @include font-size(.13rem);
          @include color(#8f8f8f);
          overflow:hidden;
          &:nth-child(2){
            @include font-size(.17rem);
            @include color(black);
          }
          &:nth-child(4){
            @include font-size(.17rem);
            @include color(#019bfd);
          }
          &:nth-child(5){
            @include flexbox();
            @include justify-content(space-around);
            @include align-items();
            button{
              @include rect(.7rem, .24rem);
              @include background-color(#fff);
              @include color(#4c4c4c);
              border-radius:.2rem;
            }
          }
        }
      }
    }
  }
}
.van-tabs__line {
  background-color: #019bfd!important;
}
</style>
