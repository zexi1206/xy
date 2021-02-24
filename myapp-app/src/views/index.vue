<template>
<div class="container">
<div class="content qq-content">
<div class='pageHeader'>
  产品分类
  <div>&lt;</div>
</div>
<van-tabs v-model="active" animated  scroll="{scrollTop:146px,isFixed:true,sticky:true}">
    <van-tab :title="'全部'">
    <!-- <ul class="qq-main" v-for="(item,index) of list" :key='index'>
        <li>
            <img :src="item.houseimg" class="qq-img"/>
            <p>{{item.housename}}</p>
            <p>{{item.price}}</p>
        </li>
    </ul> -->
    <ul>
      <li>
        <div class='proImg'>
          <img src='../../../public/img/pkm/qb.png'>
        </div>
        <div class='proTips'>
          <p>金碧辉煌 洗浴中心</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>259.00</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class='proImg'>
          <img src='../../../public/img/pkm/am.png'>
        </div>
        <div class='proTips'>
          <p>张氏按摩</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>299.00</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class='proImg'>
          <img src='../../../public/img/pkm/xx.png'>
        </div>
        <div class='proTips'>
          <p>龙泉休闲中心</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>199.00</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class='proImg'>
          <img src='../../../public/img/pkm/xy.png'>
        </div>
        <div class='proTips'>
          <p>宝龙洗浴中心</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>79.00</span>
            </div>
            <div class='btn'>
              <button>+</button>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class='proImg'>
          <img src='../../../public/img/pkm/sn.png'>
        </div>
        <div class='proTips'>
          <p>码头汗蒸馆</p>
          <div class='proPrice'>
            <div class='price'>
              <span>¥</span>
              <span>168.00</span>
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
      <ul>
        <li>
          <div class='proImg'>
          <img src='../../../public/img/pkm/am.png'>
          </div>
          <div class='proTips'>
            <p>张氏按摩</p>
            <div class='proPrice'>
              <div class='price'>
                <span>¥</span>
                <span>299.00</span>
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
      <ul>
        <li>
          <div class='proImg'>
            <img src='../../../public/img/pkm/xx.png'>
          </div>
          <div class='proTips'>
            <p>龙泉休闲中心</p>
            <div class='proPrice'>
              <div class='price'>
                <span>¥</span>
                <span>199.00</span>
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
      <ul>
        <li>
          <div class='proImg'>
            <img src='../../../public/img/pkm/xy.png'>
          </div>
          <div class='proTips'>
            <p>宝龙洗浴中心</p>
            <div class='proPrice'>
              <div class='price'>
                <span>¥</span>
                <span>79.00</span>
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
      <ul>
        <li>
          <div class='proImg'>
            <img src='../../../public/img/pkm/sn.png'>
          </div>
          <div class='proTips'>
            <p>码头汗蒸馆</p>
            <div class='proPrice'>
              <div class='price'>
                <span>¥</span>
                <span>168.00</span>
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
<!-- <van-dropdown-menu>
  <van-dropdown-item v-model="value1" :options="option1" />
  <van-dropdown-item v-model="value2" :options="option2" />
</van-dropdown-menu> -->
</div>
</div>
</template>

<script>
import axios from '@/utils/request'
import Vue from 'vue'
import { Tab, Tabs, Search } from 'vant'
Vue.use(Search)
Vue.use(Tab).use(Tabs)
export default {
  data () {
    return {
      list: [],
      active: 0,
      value: ''
    }
  },
  created () {
    let { housename } = this.$route.query
    axios.get('/search?text=' + housename).then(res => {
      this.list = res.data.data
      console.log(this.list)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';
.pageHeader{
  @include rect(100%, .4rem);
  @include flexbox();
  @include justify-content();
  @include align-items();
  position:relative;
  div{
    position:absolute;
    left:.1rem;
    top:.05rem;
  }
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
            @include color(#ec702d);
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
              background:orange;
              font-weight:bold;
            }
          }
        }
      }
    }
  }
</style>
