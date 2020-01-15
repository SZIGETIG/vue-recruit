<template>
  <div class="v-hidden">
    <x-input v-model="form" v-bind="props"></x-input>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { XInput } from '@/components/vux'

export default {
  name: 'VHidden',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    XInput
  },
  computed: {
    props() {
      return {
        title: this.title
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
