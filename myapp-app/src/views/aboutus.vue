<template>
  <div class="box">
    <header class="header"><Back />关于我们</header>
    <div class="content">
      <p class="about">本项目由三人共同编写完成，使用的框架是vue框架，具体分工协作如下：</p>
      <van-collapse v-model="activeName">
        <van-collapse-item title="彭康明" name="1">
          轮播图接口以及页面渲染，分类功能接口以及页面渲染，商品详情接口以及页面渲染，预约接口以及页面渲染，购物车接口以及页面渲染，搜索功能接口自己页面渲染，首页页面。
        </van-collapse-item>
        <van-collapse-item title="张强" name="2">
          登录注册的接口以及页面渲染，地址管理的接口以及页面渲染，问答页面的接口以及页面渲染，订单详情接口与页面渲染，个人信息接口以及页面渲染，个人中心页面，后期页面样式的修改。
        </van-collapse-item>
        <van-collapse-item title="吕遐轩" name="3">
          首页页面样式修改，商品详情样式修改，购物车样式，预约页面实现。
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
import Back from '@/components/Back.vue'
import Vue from 'vue'
import { Collapse, CollapseItem } from 'vant'

Vue.use(Collapse).use(CollapseItem)
export default {
  components: {
    Back
  },
  data () {
    return {
      activeName: ['1']
    }
  }
}
</script>
<style lang="scss" scap>
  .content {
    .about{
      line-height: 0.3rem;
      margin: 0.2rem;
    }
  }
</style>
