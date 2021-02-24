<template>
  <div class="box">
    <div class="top"><Back /><span @click="login">登录</span></div>
    <div class="login-img"></div>
    <div class="content">
      <p class="tip"></p>
      <div class="phone">
        <i class="iconfont icon-dengluyonghu"></i>
        <input type="text" placeholder="请输入用户名" v-model.lazy="username">
      </div>
      <p class="tip">{{ usernametip }}</p>
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
      <button class="userBtn" @click="register">注册</button>
      {{ tip }}
      <!-- <span class="login" @click="login">登录</span> -->
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
      username: '',
      tel: '',
      password: '',
      tip: '',
      flag: true
    }
  },
  computed: {
    usernametip () {
      if (this.username === '') {
        return ''
      } else if (this.username.length < 3) {
        return '用户名格式错误'
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
    },
    teltip () {
      if (this.tel === '') {
        return ''
      } else if (this.tel.length !== 11) {
        return '手机号码格式错误'
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
    login () {
      this.$router.push('/login')
    },
    register () {
      if (this.username === '' || this.usernametip !== '') {
        // console.log('用户名输入不正确')
        this.tip = '请输入正确的用户名'
        return
      }
      if (this.tel === '' || this.teltip !== '') {
        this.tip = '请输入正确的手机号码'
        return
      }
      if (this.password === '' || this.passwordtip !== '') {
        this.tip = '请输入正确的密码'
        return
      }
      this.tip = ''
      console.log('可以注册了')
      axios.post('/users/register', {
        username: this.username,
        tel: this.tel,
        password: this.password
      }).then(res => {
        // console.log(res.data)
        if (res.data.code === '10000') {
          Toast('该用户已注册，请直接登陆')
        } else {
          Toast.success('注册成功')
          this.$router.back()
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
  display: block;
  width: 90%;
  margin: 5px 5%;
  // border-bottom: 1px solid #efefef;
  line-height: 36px;
  text-indent: 10px;
}
.tip {
  color: #019fdb;
  text-align: center;
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
.login{
  float: right;
  margin-right: 0.2rem;
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
}
.icon-denglu-mima, .icon-dengluyonghu {
  line-height: 0.5rem;
  display: block;
  float: left;
  line-height: 36px;
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
