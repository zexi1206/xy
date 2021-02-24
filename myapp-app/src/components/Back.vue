<template>
  <span @click="back" class="back iconfont icon-fanhui">返回</span>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>
