<template>
  <div class="box">
    <header class="header"><Back/>咨询-详情</header>
    <div class="content">
      <div class="answer">
        <h1>{{ problem }}</h1>
        <ul>
          <li class="life">养生</li>
          <li>2018-9-12</li>
        </ul>
        <span>{{ answer }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/utils/request'
import Back from '@/components/Back'
export default {
  components: {
    Back
  },
  data () {
    return {
      answer: '',
      problem: '',
      answerlist: []
    }
  },
  created () {
    // console.log(this.$route.query)
    const problemid = this.$route.query.problemid
    axios.get('/problem/answer?problemid=' + problemid).then(res => {
      console.log(res.data)
      this.answer = res.data.data.answer
      this.problem = res.data.data.problem
    })
  }
}
</script>
<style lang="scss" scoped>
  .content {
    .answer {
      width: 80%;
      margin: 10%;
      h1 {
        font-size: 19px;
        margin: 0.25rem 0;
      }
      span {
        line-height: 0.27rem;
        text-indent: 2em;
        font-size: 16px;
      }
      ul {
        width: 96%;
        margin: 0 2%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.25rem;
        .life {
          background-color: #eee;
        }
        li {
          color: #999;
        }
      }
    }
  }
</style>
