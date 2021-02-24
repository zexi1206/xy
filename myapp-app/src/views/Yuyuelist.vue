<template>
  <div class="box">
    <header class="header">
      <Back />预约界面
    </header>
    <div class="content">
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
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Back from '@/components/Back'
import axios from '@/utils/request'

import { Panel, Button, Toast } from 'vant'
Vue.use(Panel)
Vue.use(Button)
export default {
  components: {
    Back
  },
  data () {
    return {
      name: '',
      itemlist: []
    }
  },
  created () {
    var userid = localStorage.getItem('userid')
    console.log(userid)
    axios.get('/yuyue?userid=' + userid).then(res => {
      console.log(res.data.data)
      this.itemlist = res.data.data
    })
  },
  methods: {
    fail (item, index) {
      var userid = localStorage.getItem('userid')
      axios.get('/yuyue/delete?userid=' + userid + '&houseid=' + item.houseid).then(res => {
        this.itemlist.splice(index, 1)
      })
      Toast('取消预约成功')
    }
  }
}
</script>

<style lang=scss scoped>
.yu-jiemian{
    overflow: hidden;
    margin-left: 0.1rem;
    img{
        width:1rem;
        height:1rem;
        float: left;
        margin-right: 0.1rem;
    }
    ul{
        float: left;
       li{
           margin-left: 5px;
       }
      .li-last{
          margin-left: 124px;
          color: #019bdf;
      }
    }
}
.van-panel__header-value {
    color: #019bdf!important;
}
</style>
