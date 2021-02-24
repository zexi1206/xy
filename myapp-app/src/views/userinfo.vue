<template>
  <div class="container">
    <div class="box">
      <header class="header"><Back/>个人信息</header>
      <div class="content information-box">
        <div class="userimg">
          <span>更换头像</span>
          <img :src="this.userimg" alt="" v-if="show">
          <van-uploader :after-read="afterRead" v-else />
        </div>
        <ul>
          <li>
            <van-cell-group>
              <van-field
                v-model="username"
                clearable
                label="昵称"
                placeholder="请输入昵称"
              />
              <van-field
                v-model="tel"
                type='tel'
                label="手机号"
                placeholder="请输入手机号"
              />
              <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
              />
            </van-cell-group>
          </li>
          <li>
            <span>性别</span>
            <van-radio-group v-model="radio">
              <van-radio name="1" checked-color="#019bfd">男</van-radio>
              <van-radio name="2" checked-color="#019bfd">女</van-radio>
            </van-radio-group>
          </li>
        </ul>
      </div>
    </div>
    <div class="quitLogin">
      <ul>
        <li :class="active ? 'active' : '' " @click="save">修改</li>
        <li :class="active ? '' : 'active' " @click="out">退出登陆</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/request'

import Vue from 'vue'
import Back from '@/components/Back'
import { RadioGroup, Radio, Field, Toast, Cell, CellGroup, Uploader } from 'vant'
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Cell).use(CellGroup)
Vue.use(Uploader)
export default {
  components: {
    Back
  },
  data () {
    return {
      radio: '1',
      show: false,
      username: '',
      password: '',
      tel: '',
      active: true,
      sex: '',
      userinfo: [],
      userimg: ''
    }
  },
  methods: {
    afterRead (file) {
      this.userimg = file.content
      localStorage.setItem('userimg', this.userimg)
      this.show = true
    },
    showPopup () {
      this.show = true
    },
    save () {
      this.active = true
      axios.post('/users/update', {
        tel: this.tel,
        password: this.password
      }).then(res => {
        console.log(111)
        Toast.success('修改成功')
        this.$router.back()
        localStorage.setItem('sex', this.radio)
        localStorage.setItem('password', this.password)
      })
    },
    out () {
      this.active = false
      Toast.success('退出成功')
      localStorage.removeItem('tel')
      localStorage.removeItem('username')
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      this.$router.push('/user')
    }
  },
  created () {
    axios.get('/users/select?' + '&username=' + localStorage.getItem('username')).then(res => {
      console.log(res.data)
      if (res.data.code === '10001') {
        this.flag = false
      } else {
        this.flag = true
        this.userinfo = res.data
        this.username = this.userinfo.username
        // this.password = this.userinfo.password
        this.tel = this.userinfo.tel
        // this.password = localStorage.getItem('password')
        if (localStorage.getItem('sex')) {
          this.radio = localStorage.getItem('sex')
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .information-box {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      height: auto;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      li {
        width: 80%;
        display: flex;
        margin: 5px 10%;
        min-height: 0.5rem;
        &:nth-child(2) {
          span {
            width: 0.74rem;
            line-height: 50px;
          }
          .van-radio-group {
            width: 1.5rem;
            display: flex;
            justify-content: space-around;
          }
        }
        .van-cell-group {
          width: 100%;
          margin: 10px auto;
          .van-cell {
            padding: 10px 0!important;
          }
        }
      }
    }
  }
  .quitLogin {
    width: 100%;
    height: 0.5rem;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      li {
        flex: 1;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 16px;
        text-align: center;
        color: #019bfd;
      }
      .active {
        background-image: linear-gradient(to right,#019bfd,#01b9ff);
        color: #fff;
      }
    }
  }
  .userimg {
    width: 80%;
    height: 15%;
    margin: 0 10%;
    margin-top: 0.2rem;
    img {
      width: 78px;
      height: 78px;
      // vertical-align: middle;
      margin-left: 58px;
    }
    .van-uploader {
      vertical-align: middle;
      right: -20%;
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>
