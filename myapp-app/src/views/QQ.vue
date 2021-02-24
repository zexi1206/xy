<template>
<div class="container">
<div class="content qq-content">
<div class='pageHeader'>
  产品分类
  <div @click="back">&lt;返回</div>
</div>
<van-tabs v-model="active" sticky>
    <van-tab :title="'全部'">
    <!-- <ul class="qq-main" v-for="(item,index) of list" :key='index'>
        <li>
            <img :src="item.houseimg" class="qq-img"/>
            <p>{{item.housename}}</p>
            <p>{{item.price}}</p>
        </li>
    </ul> -->
    <van-loading color="#1989fa" v-if="Loadingflag"/>
    <img v-if="imgflag" src="../../public/img/zanwu.png" class="img-no">
    <ul v-if="flag">
      <li v-for="(item,index) of list" :key="index" @click="add(item.houseid)">
        <div class='proImg'>
          <img :src='item.houseimg'>
        </div>
        <div class='proTips'>
          <p>{{item.housename}}</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>{{item.price}}</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </van-tab>
  <van-tab key="index" :title="'按摩'">
    <div class="qq-main">
      <van-loading color="#1989fa" v-if="Loadingflag"/>
      <ul v-if="flag">
        <li v-for="(item,index) of list" :key="index" @click="add(item.houseid)">
        <div class='proImg'>
          <img :src='item.houseimg'>
        </div>
        <div class='proTips'>
          <p>{{item.housename}}</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>{{item.price}}</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      </ul>
    </div>
  </van-tab>
  <van-tab :title="'休闲'">
    <div class="qq-main">
      <van-loading color="#1989fa" v-if="Loadingflag"/>
      <ul v-if="flag">
        <li v-for="(item,index) of list" :key="index" @click="add(item.houseid)">
        <div class='proImg'>
          <img :src='item.houseimg'>
        </div>
        <div class='proTips'>
          <p>{{item.housename}}</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>{{item.price}}</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      </ul>
    </div>
  </van-tab>
  <van-tab :title="'洗浴'">
    <div class='qq-main'>
      <van-loading color="#1989fa" v-if="Loadingflag"/>
      <ul v-if="flag">
       <li v-for="(item,index) of list" :key="index" @click="add(item.houseid)">
        <div class='proImg'>
          <img :src='item.houseimg'>
        </div>
        <div class='proTips'>
          <p>{{item.housename}}</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>{{item.price}}</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      </ul>
    </div>
  </van-tab>
  <van-tab :title="'桑拿'">
    <div class='qq-main'>
      <van-loading color="#1989fa" v-if="Loadingflag"/>
      <ul v-if="flag">
<li v-for="(item,index) of list" :key="index" @click="add(item.houseid)">
        <div class='proImg'>
          <img :src='item.houseimg'>
        </div>
        <div class='proTips'>
          <p>{{item.housename}}</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>{{item.price}}</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      </ul>
    </div>
  </van-tab>
</van-tabs>
</div>
</div>
</template>

<script>
import axios from '@/utils/request'
import Vue from 'vue'
import { Tab, Tabs, Search, Loading, Toast } from 'vant'
Vue.use(Search)
Vue.use(Tab).use(Tabs).use(Loading).use(Toast)
export default {
  data () {
    return {
      list: [],
      active: 0,
      value: '',
      flag: true,
      Loadingflag: false,
      imgflag: false
    }
  },
  created () {
    let { housename } = this.$route.query
    this.Loadingflag = true
    axios.get('/search?text=' + housename).then(res => {
      this.Loadingflag = false
      this.list = res.data.data
      console.log(this.list)
      if (this.list.length === 0) {
        Toast('找不到您想要的')
        this.imgflag = true
      }
    })
  },
  methods: {
    upchange () {
      this.list.sort((a, b) => {
        return a.price - b.price
      })
    },
    downchange () {
      function sortData (a, b) {
        return b.price - a.price
      }
      this.listinfo.sort(sortData)
    },
    add (val) {
      var houseid = val
      console.log(houseid)
      this.$router.push('/shop?houseid=' + houseid)
    },
    back () {
      this.$router.go(-1)
    }
  },
  watch: {
    list: {
      handler (newVal, oldVal) {
        if (this.list.length !== 0) {
          this.imgflag = false
        }
      }
    },
    active: {
      handler (newVal, oldVal) {
        this.flag = false
        this.Loadingflag = true
        if (this.active === 0) {
          axios.get('/house').then(res => {
            this.list = res.data.data
            this.flag = true
            this.Loadingflag = false
          })
        }
        if (this.active === 1) {
          axios.get('/subscribe?type=anmo').then(res => {
            this.list = res.data.data
            this.flag = true
            this.Loadingflag = false
          })
        }
        if (this.active === 2) {
          axios.get('/subscribe?type=xiuxian').then(res => {
            this.list = res.data.data
            this.flag = true
            this.Loadingflag = false
          })
        }
        if (this.active === 3) {
          axios.get('/subscribe?type=xiyu').then(res => {
            this.list = res.data.data
            this.flag = true
            this.Loadingflag = false
          })
        }
        if (this.active === 4) {
          axios.get('/subscribe?type=sangna').then(res => {
            this.list = res.data.data
            this.flag = true
            this.Loadingflag = false
          })
        }
      }
    },
    deep: true
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';
.pageHeader{
  @include rect(100%, .44rem);
  @include flexbox();
  @include justify-content();
  @include align-items();
  position:relative;
  background-image: linear-gradient(to right,#019bfd,#01b9ff);
  font-size: 16px;
  line-height: 0.44rem;
  color: #fff;
  div{
    position:absolute;
    left:0.2rem;
  }
}
.content{
  overflow: auto;
}
.img-no{
  width:100%;
  height:556px;
}
.van-loading{
  margin-left:50%;
  margin-top:50%;
}
ul{
  li{
    @include rect(100%, 1.5rem);
    @include flexbox();
    @include justify-content();
    @include margin(.08rem 0 0 0);
    @include padding(0 .05rem 0 .05rem);
    border-bottom:.01rem solid #e5e5e5;
    .proImg{
      @include rect(60%, 100%);
      @include flexbox();
      @include justify-content();
      @include align-items();
      img{
        @include rect(80%, 80%);
        border-radius:.06rem;
      }
    }
    .proTips{
      @include rect(40%, 100%);
      p{
        @include rect(100%, 35%);
        @include flexbox();
        @include align-items();
        @include font-size(.16rem);
        @include font-weight(bold);
      }
      .proPrice{
        @include rect(100%,55%);
        @include flexbox();
        @include justify-content();
        @include align-items();
          .price{
            @include rect(70%, 100%);
            @include flexbox();
            @include align-items(flex-end);
            @include font-size(.2rem);
            @include color(#019bdf);
          }
          .btn{
            @include rect(30%, 100%);
            @include flexbox();
            @include justify-content();
            @include align-items(flex-end);
            button{
              @include rect(.25rem, .25rem);
              text-align:center;
              border:0;
              border-radius:50%;
              background:#019bdf;
              font-weight:bold;
            }
          }
        }
      }
    }
  }
</style>
