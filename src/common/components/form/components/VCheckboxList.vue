<template>
  <div class="v-checkbox-list">
    <checklist v-model="form" v-bind="props"></checklist>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { Checklist } from '@/components/vux'

export default {
  name: 'VCheckboxList',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    Checklist
  },
  computed: {
    props() {
      return {
        title: this.title,
        options: this.options
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
