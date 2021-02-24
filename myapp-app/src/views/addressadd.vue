<template>
  <div class="box">
    <header class="header">
      <Back />添加地址
    </header>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import axios from '@/utils/request'
import Back from '@/components/Back'
import city from '@/utils/city'
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
      areaList: city,
      searchResult: []
    }
  },
  methods: {
    onSave (content) {
      axios.post('/address/add', {
        userid: localStorage.getItem('userid'),
        name: content.name,
        tel: content.tel,
        address: content.city + content.country + content.county + content.addressDetail,
        isDefault: content.isDefault
      }).then(res => {
        console.log(res)
        this.$router.push('/addresslist')
      })
    }
  }
}
</script>
