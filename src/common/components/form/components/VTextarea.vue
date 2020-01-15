<template>
  <div class="v-textarea">
    <x-textarea ref="textarea"
      v-model="form" v-bind="props">
      <template slot="label">
        <label class="weui-label">
          <span>{{title}}</span>
          <i v-if="hasHelp" class="help-text ion-md-help-circle" @click.stop="showHelpText()"></i>
        </label>
      </template></x-textarea>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { XTextarea } from '@/components/vux'

export default {
  name: 'VTextarea',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    XTextarea
  },
  computed: {
    props() {
      return {
        title: this.title,
        placeholder: this.placeholder || '请输入',
        max: this.rules.maxlength && Number(this.rules.maxlength),
        showCounter: true,
        rows: Number(this.rows)
      }
    },
    rows() {
      return this.field['#rows'] || '3'
    }
  }
}
</script>

<style lang="less" scoped>

</style>
