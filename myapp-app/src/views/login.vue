<template>
  <div class="box">
    <div class="top"><Back /><span @click="register">注册</span></div>
    <div class="login-img"></div>
      <div class="content">
        <p class="tip"></p>
        <div class="phone">
          <i class="iconfont icon-shoujihao"></i>
          <input type="text" placeholder="手机号码" v-model.lazy="tel">
        </div>
        <p class="tip">{{ teltip }}</p>
        <div class="phone">
          <i class="iconfont icon-denglu-mima"></i>
          <input type="password" placeholder="密码" v-model.lazy="password" ref="input">
          <i class="iconfont icon-denglu-mimayincang" v-if="flag" @click="look"></i>
          <i class="iconfont icon-dengluzhuce-mimakejian" v-else @click="unlook"></i>
        </div>
        <p class="tip">{{ passwordtip }}</p>
        <button class="userBtn" @click="login">登陆</button>
        <p class="tip">{{ tip }}</p>
        <span class="register" >如果您还没有账号，请&nbsp;<a @click="register">立即注册</a></span>
      </div>
      <div class="agree">
        <span>注册或登录，及视为同意</span>
        <p>《用户协议》</p>
      </div>
  </div>
</template>
<script>
import Back from '@/components/Back'
import axios from '@/utils/request'

import Vue from 'vue'
import { Toast } from 'vant'
Vue.use(Toast)
export default {
  components: {
    Back
  },
  data () {
    return {
      tel: '',
      password: '',
      tip: '',
      flag: true
    }
  },

  computed: {
    teltip () {
      if (this.tel === '') {
        return ''
      } else if (this.tel.length !== 11) {
        return '手机号码格式错误'
      } else {
        return ''
      }
    },
    passwordtip () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 6) {
        return '密码格式错误'
      } else {
        return ''
      }
    }
  },
  methods: {
    look () {
      this.flag = false
      this.$refs.input.type = 'text'
    },
    unlook () {
      this.flag = true
      this.$refs.input.type = 'password'
    },
    register () {
      this.$router.push('/register')
    },
    login () {
      // console.log('11111')
      if (this.tel === '' || this.teltip !== '') {
        this.tip = '手机号格式错误'
        return
      }
      if (this.password === '' || this.passwordtip !== '') {
        this.tip = '密码格式错误'
        return
      }
      // 登陆
      axios.post('/users/login', {
        tel: this.tel,
        password: this.password
      }).then(res => {
        console.log(res.data)
        /***
         * 10086 未注册
         * 10100 密码错误
         * 10010 登陆成功
         */
        if (res.data.code === '10086') {
          this.tip = '该用户未注册，请先注册'
        } else if (res.data.code === '10100') {
          this.tip = '密码错误'
        } else {
          // 此时为登陆成功，获取token信息存入本地
          this.tip = ''
          const token = res.data.token
          localStorage.setItem('token', token)
          localStorage.setItem('userid', res.data.userid)
          localStorage.setItem('username', res.data.username)
          localStorage.setItem('userimg', 'data:image/jpeg;base64,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')
          localStorage.setItem('tel', res.data.tel)
          // this.$router.go()
          this.$router.back()
          // this.$router.push('/user')
          Toast.success('登陆成功')
          // console.log(res.data.tel)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.top {
  width: 100%;
  height: 0.6rem;
}
.login-img {
  width: 100%;
  height: 0.4rem;
}
.top span {
  font-size: 16px;
  float: right;
  // width: 0.5rem;
  margin-right: 0.25rem;
  line-height: 0.6rem;
}
input {
  outline: none;
  border: 0;
  width: 90%;
  margin: 5px 5%;
  // border-bottom: 1px solid #efefef;
  text-indent: 10px;
  display: block;
  line-height: 36px;
}
.tip {
  text-align: center;
  color: #019bfd;
  height: 20px;
}
.userBtn {
  outline: none;
  border: 0;
  display: block;
  background-image: linear-gradient(to right,#019bfd,#01b9ff);
  width: 86%;
  margin: 15px 7%;
  line-height: 40px;
  font-size: 18px;
  color: #fff;
}
.register {
  display: block;
  width: 100%;
  text-align: center;
  color: #666;
}
.register a {
  color: #019bfd;
}
.phone {
  width: 86%;
  margin: 0 7%;
  border-bottom: 1px solid #efefef;
  display: flex;
}
.icon-shoujihao {
  line-height: 0.5rem;
  display: block;
  float: left;
  line-height: 36px;
  color: #333;
}
.icon-denglu-mima {
  line-height: 0.5rem;
  display: block;
  float: left;
  line-height: 36px;
  color: #333;
}
.icon-denglu-mimayincang, .icon-dengluzhuce-mimakejian {
  line-height: 36px;
  margin-right: 0.05rem;
}
.agree {
  margin-bottom: 0.3rem;
  width: 100%;
  span {
    display: block;
    text-align: center;
    line-height: 0.25rem;
    font-size: 13px;
    color: #999;
  }
  p {
    text-align: center;
    color: #019bfd;
    font-size: 14px;
  }
}
</style>
