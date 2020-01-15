<template>
  <div class="v-address">
    <x-address v-model="form" v-bind="props" @on-hide="onHide($event)"></x-address>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { XAddress, ChinaAddressV4Data } from '@/components/vux'

export default {
  name: 'VAddress',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    XAddress
  },
  data() {
    return {
      address: []
    }
  },
  computed: {
    form: {
      get: function() {
        return this.value ? [this.value.state_province, this.value.city, this.value.address] : []
      },
      set: function(value) {
        this.address = value
      }
    },
    props() {
      return {
        title: this.title,
        list: ChinaAddressV4Data
      }
    }
  },
  methods: {
    onHide(confirm) {
      confirm && this.$emit('input', {
        state_province: this.address[0],
        city: this.address[1],
        address: this.address[2]
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
