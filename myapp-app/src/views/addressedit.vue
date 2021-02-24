<template>
  <div class="box">
    <header class="header"><Back />地址修改</header>
    <div class="content">
      <van-address-edit
        :address-info='addressInfo'
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>

<script>
import axios from '@/utils/request'
import Back from '@/components/Back'
import city from '@/utils/city'
import Vue from 'vue'
import { Toast, AddressEdit } from 'vant'
Vue.use(Toast)
Vue.use(AddressEdit)
export default {
  components: {
    Back
  },
  data () {
    return {
      areaList: city,
      searchResult: [],
      addressInfo: {}
    }
  },
  created () {
    let addressid = this.$route.query.addressid
    let url = '/address/one?addressid=' + addressid
    axios.get(url).then(res => {
      this.addressInfo = {
        name: res.data.data[0].name,
        tel: res.data.data[0].tel,
        province: res.data.data[0].province,
        city: res.data.data[0].city,
        county: res.data.data[0].county,
        addressDetail: res.data.data[0].addressDetail,
        isDefault: res.data.data[0].isDefault,
        postalCode: res.data.data[0].email,
        areaCode: res.data.data[0].areaCode
      }
    })
  },
  methods: {
    onSave (content) {
      let addressid = this.$route.query.addressid
      axios.post('/address/addressedit', {
        userid: localStorage.getItem('userid'),
        name: content.name,
        tel: content.tel,
        address: content.province + content.city + content.county + content.addressDetail,
        isDefault: content.isDefault,
        addressid: addressid
      }).then(res => {
        this.$router.push('/addresslist')
      })
    },
    onDelete () {
      let addressid = this.$route.query.addressid
      let url = '/address/delete?addressid=' + addressid
      axios.get(url).then(res => {
        this.$router.push('/addresslist')
      })
    },
    back () {
      this.$router.back()
    }
  }
}
</script>
