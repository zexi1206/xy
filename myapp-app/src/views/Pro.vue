<template>
  <div class="box">
    <header class="header">问答</header>
    <div class="content">
      <p>— 养生问答 —</p>
      <ul>
        <li v-for="(item) of textlist1" :key="item.problemid" class="list1" @click="toanswer(item.problemid)">
          <img :src="item.problemimg" alt="">
          <span> {{ item.problem }} </span>
        </li>
      </ul>
      <p><strong>— 养生问答 —</strong></p>
      <div v-for="(item) of textlist2" :key="item.problemid" class="list2" @click="toanswer(item.problemid)">
        <span> {{ item.problem }} </span>
        <img :src="(item).problemimg" alt="">
      </div>
      <div v-for="item of textlist3" :key="item.problemid" class="list3" @click="toanswer(item.problemid)">
        <img :src="item.problemimg" alt="">
        <span> {{ item.problem }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/request'

export default {
  methods: {
    toanswer (problemid) {
      this.$router.push('/answer?problemid=' + problemid)
    }
  },
  data () {
    return {
      textlist1: [],
      textlist2: [],
      textlist3: []
    }
  },
  created () {
    axios.get('/problem').then(res => {
      console.log(res.data)
      let list1 = []
      let list2 = []
      let list3 = []
      console.log(res)
      res.data.data.map(item => {
        if (item.type === 1) {
          list1.push(item)
        } else if (item.type === 2) {
          list2.push(item)
        } else {
          list3.push(item)
        }
      })
      this.textlist1 = list1
      this.textlist2 = list2
      this.textlist3 = list3
      console.log(list1)
    })
  }
}
</script>

<style lang="scss" scoped>
.content {
  p {
    text-align: center;
    line-height: 0.5rem;
    font-size: 18px;
  }
  ul {
    width: 98%;
    margin: 1%;
    .list1 {
      width: 46%;
      margin: 2%;
      float: left;
      img {
        width: 100%;
        border-radius: 0.05rem;
      }
      span {
        line-height: 0.4rem;
      }
    }
  }
  .list2 {
    width: 94%;
    margin: 3%;
    padding-bottom: 0.15rem;
    img {
      width: 100%;
      height: 2rem;
    }
    span {
      line-height: 0.4rem;
    }
  }
  .list3 {
    display: flex;
    width: 94%;
    margin: 3%;
    border-top: 1px solid #f3f3f3;
    padding-top: 0.1rem;
    img {
      width: 35%;
      height:0.9rem;
    }
    span {
      margin: 0 3%;
    }
  }
}
</style>
