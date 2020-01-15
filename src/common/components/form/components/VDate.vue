<template>
  <div class="v-date">
    <datetime v-model="form" v-bind="props">
      <template slot="title">
        <label class="weui-label">
          <span>{{title}}</span>
          <i v-if="hasHelp" class="help-text ion-md-help-circle" @click.stop="showHelpText()"></i>
        </label>
      </template>
    </datetime>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { Datetime } from '@/components/vux'

export default {
  name: 'VDate',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    Datetime
  },
  computed: {
    props() {
      return {
        placeholder: this.placeholder || '请选择',
        minYear: 1970
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
