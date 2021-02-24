<template>
  <div class="box">
    <header class="header"><Back />地址管理</header>
    <div class="content">
      <div class="box">
        <van-address-list
          v-model="defaultaddress"
          :list="list"
          @add="onAdd"
          @edit="onEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/request'
import Back from '@/components/Back'
import Vue from 'vue'
import { AddressList, Toast, AddressEdit } from 'vant'
Vue.use(Toast)
Vue.use(AddressList)
Vue.use(AddressEdit)
export default {
  components: {
    Back
  },
  data () {
    return {
      defaultaddress: 0,
      list: []
    }
  },
  methods: {
    onAdd () {
      this.$router.push('/addressadd')
    },
    onEdit (item, index) {
      this.$router.push('/addressedit?addressid=' + item.addressid)
    }
  },
  created () {
    axios.get('/address/addresslist?userid=' + localStorage.getItem('userid')).then(res => {
      if (res.data.code !== '000') {
        for (let i = 0; i < res.data.data.length; i++) {
          res.data.data[i].id = i
          this.list.push(res.data.data[i])
          if (res.data.data[i].isDefault === 1) {
            this.defaultaddress = i
          }
        }
      }
    })
  }
}
</script>
<style lang="scss">
.van-address-item .van-radio__icon--checked .van-icon {
  background-color: #019bfd!important;
  border: #019bfd;
}
</style>
