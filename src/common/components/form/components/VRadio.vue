<template>
  <div class="v-radio">
    <popup-radio v-model="form" v-bind="props"></popup-radio>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { PopupRadio } from '@/components/vux'

export default {
  name: 'VRadio',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    PopupRadio
  },
  computed: {
    props() {
      return {
        title: this.title,
        placeholder: this.placeholder || '请选择',
        options: this.options,
        selectedLabelStyle: {
          color: 'var(--primary-color)'
        }
      }
    },
    options() {
      return this.allOptions.map(([key, value]) => ({
        key: this.replaceOptionToken(key),
        value
      })).filter(({ value }) => this.filterOption(value))
    }
  }
}
</script>

<style lang="less" scoped>

</style>
