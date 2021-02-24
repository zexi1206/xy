<template>
  <div class="contain dingdan-contain">
  <header class="header" id="din-header"><span class="iconfont icon-fanhui" @click="back"></span></header>
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
      <van-panel title="订单信息" desc="国际会所欢迎你"  v-for="(item, index) of itemlist" :key='item.orderid'>
        <div class="yu-jiemian">
          <img :src='item.list.img' />
          <ul>
          <li>{{item.list.housename}}</li>
          <li>预约时间：{{item.time}}</li>
          <li>预约次数: {{item.num}}</li>
          <li>预约日期：{{item.date}}</li>
          <li>服务时长：{{item.houer}}</li>
          <li class="li-last">预计消费：￥{{item.num*item.price}}</li>
          </ul>
        </div>
        <div slot="footer">
          <van-button size="small" type="danger" @click="fail(item,index)">取消预约</van-button>
        </div>
      </van-panel>
        </van-tab>
        <van-tab title="待付款">
      <van-panel title="待付款" desc="国际会所欢迎你"  v-for="item of itemlist" :key='item.orderid'>
        <div class="dingdan-jiemian">
          <img :src='item.list[0].houseimg' />
          <ul>
          <li>{{item.list[0].housename}}</li>
          <li>数量: {{item.list[0].num}}</li>
          <li class="li-last">总价：￥{{item.list[0].num*item.list[0].price}}</li>
          </ul>
        </div>
        <div slot="footer" class="dingdan-button">
          <div>点我支付</div>
          <div>删除订单</div>
          <!-- <van-button size="small" type="save" @click="fail(item,index)">取消订单</van-button> -->
        </div>
      </van-panel>
        </van-tab>
        <van-tab title="待收货">
           <van-panel title="预约信息" desc="国际会所欢迎你" status="预约成功" v-for="item of itemlist" :key='item.yuyueid'>
        <div class="dingdan-jiemian">
          <img :src='item.img' />
          <ul>
          <li>{{item.housename}}</li>
          <li>预约时间：{{item.time}}</li>
          <li>预约次数: {{item.num}}</li>
          <li>预约日期：{{item.date}}</li>
          <li>服务时长：{{item.houer}}</li>
          <li class="li-last">预计消费：￥{{item.num*item.price}}</li>
          </ul>
        </div>
        <div slot="footer">
          <div>点我支付</div>
          <div>删除订单</div>
        </div>
      </van-panel>
        </van-tab>
        <van-tab title="待评价">
           <van-panel title="预约信息" desc="国际会所欢迎你" status="预约成功" v-for="(item, index) of itemlist" :key='item.yuyueid'>
        <div class="yu-jiemian">
          <img :src='item.img' />
          <ul>
          <li>{{item.housename}}</li>
          <li>预约时间：{{item.time}}</li>
          <li>预约次数: {{item.num}}</li>
          <li>预约日期：{{item.date}}</li>
          <li>服务时长：{{item.houer}}</li>
          <li class="li-last">预计消费：￥{{item.num*item.price}}</li>
          </ul>
        </div>
        <div slot="footer">
          <van-button size="small" type="danger" @click="fail(item,index)">取消预约</van-button>
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
Vue.use(Tab).use(Tabs).use(Search)
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
    Toast()
    // axios.get('/order/dindan?userid=' + userid + '&status=' + this.active).then(res => {
    //   console.log(res.data.data)
    // })
  },
  methods: {
    onSearch () {
      console.log(2)
    },
    back () {
      this.$router.go(-1)
    }
  },
  watch: {
    active: {
      handler (newVal, oldVal) {
        axios.get('/order/dindan?userid=' + this.userid + '&status=' + this.active).then(res => {
          this.itemlist = res.data.data
          console.log(this.itemlist)
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="scss">
@import '../lib/reset.scss';
.dingdan-contain{
  overflow: auto;
  #dingdan-header{
    height:0.44rem;
  }
}
#din-header{
  .icon-fanhui{
    font-size: 22px;
    margin-left:5px;
  }
}
.dingdan-jiemian{
  @include flexbox();
  img{
    width:90px;
    height:90px;
  }
}
</style>
