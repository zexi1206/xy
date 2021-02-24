<template>
    <div class="content">
    <header class="yuyue-header"><Back/><div>预约</div></header>
  <van-field
  readonly
  clickable
  label="预约日期"
  :value="value"
  placeholder="预约日期"
  @click="showPicker = true"
/>
    <van-field
  readonly
  clickable
  label="营业时段"
  :value="value1"
  placeholder="营业时段"
  @click="show(1)"
/>
  <van-field
  readonly
  clickable
  label="服务时长"
  :value="value2"
  placeholder="服务时长"
  @click="show(2)"
/>
  <van-field
  readonly
  clickable
  label="服务价格"
  :value="value3"
  placeholder="服务价格"
  @click="show(3)"
/>
<footer><div class="yu-add" @click="tijiao">点击确认</div></footer>
<van-popup v-model="showPicker" position="bottom">
  <van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
  @cancel="showPicker = false"
  @confirm="onConfirm"
/>
</van-popup>
<van-popup v-model="showPic" position="bottom">
  <van-picker
    show-toolbar
    :columns="columns"
    @cancel="showPic = false"
    @confirm="onCon"
  />
</van-popup>
   </div>
</template>

<script>
import axios from '@/utils/request'

import Vue from 'vue'
import { Popup, DatetimePicker, Field, Picker, Toast } from 'vant'
import Back from '@/components/Back.vue'
Vue
  .use(Popup)
  .use(DatetimePicker)
  .use(Field)
  .use(Picker)
  .use(Toast)
export default {
  components: {
    Back
  },
  data () {
    return {
      value: '',
      value1: '',
      value2: '',
      value3: '',
      flag: '',
      showPic: false,
      showPicker: false,
      minDate: new Date(),
      columns: [],
      currentDate: new Date(),
      price: '',
      img: '',
      housename: ''
    }
  },
  created () {
    var { houseid } = this.$route.query
    axios.get('/shop?houseid=' + houseid).then(res => {
      this.price = res.data.data[0].price
      this.img = res.data.data[0].houseimg
      this.housename = res.data.data[0].housename
      console.log(this.img, this.housename)
    })
  },
  methods: {
    onConfirm (value) {
      this.value = value.toLocaleDateString()
      this.showPicker = false
      console.log(value)
    },
    onCon (value) {
      console.log(value)
      if (this.flag === 0) {
        this.showPic = false
      }
      if (this.flag === 1) {
        this.value1 = value
        this.showPic = false
      }
      if (this.flag === 2) {
        this.value2 = value
        this.value3 = this.price
        this.showPic = false
      }
    },
    show (label) {
      if (label === 1 && this.value !== '') {
        this.flag = 1
        var day = this.minDate.toLocaleDateString()
        if (this.value === day) {
          // var date = new Date()
          var houer = this.minDate.getHours()
          console.log(houer)
          if (houer >= 8 && houer < 13) {
            this.columns = ['13:00~17:00', '20:00~24:00']
          }
          if (houer >= 13 && houer < 20) {
            this.columns = ['20:00~24:00']
          }
          if (houer >= 20 && houer <= 23) {
            this.columns = ['今日已过预约时间请重新选择日期']
            this.flag = ''
          }
          if (houer >= 0 && houer < 8) {
            this.columns = ['08:00~中午12:00', '13:00~17:00', '20:00~24:00']
          }
          this.showPic = true
        } else {
          this.columns = ['08:00~中午12:00', '13:00~17:00', '20:00~24:00']
          this.showPic = true
        }
      } else if (this.value === '') {
        Toast('请先输入日期')
      }
      if (label === 2 && this.value1 !== '') {
        if (this.value === '') {
          this.columns = ['请先选择服务日期']
          this.showPic = true
          this.flag = 0
        } else {
          this.flag = 2
          this.columns = ['4小时']
          this.showPic = true
        }
      }
      if (label === 2 && this.value1 === '') {
        Toast('请先确定时间')
      }
    },
    tijiao () {
      if (this.value !== '' && this.value1 !== '' && this.value2 !== '' && this.value3 !== '') {
        var userid = localStorage.getItem('userid')
        var date = this.value
        var time = this.value1
        var houer = this.value2
        var price = this.value3
        var { houseid } = this.$route.query
        // var prag = { userid, date, time, houer, price, houseimg, housename }
        axios.get('/yuyue/add?userid=' + userid + '&houseid=' + houseid + '&date=' + date + '&time=' + time + '&houer=' + houer + '&price=' + price + '&img=' + this.img + '&housename=' + this.housename).then(res => {
          Toast('预约成功')
          console.log(res.data)
        })
        this.$router.go(-1)
        // console.log(prag)
      } else {
        Toast('请填写正确的信息')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.yuyue-header{
  background-image: linear-gradient(to right,#019bfd,#01b9ff);
  height: 0.44rem;
  color: #fff;
  div{
    text-align: center;
    font-size: 16px;
    height: 0.44rem;
    line-height: 0.44rem;
  }
}
footer{
  .yu-add{
    background-color: #019bdf;
    color: #fff;
    text-align: center;
    position: fixed;
    bottom: 0;
    font: 18px/50px '';
    height:50px;
    width:100%;
    line-height: 50px;
    font-size: 16px;
  }
}
.van-cell {
  padding: 20px 40px!important;
}
</style>
