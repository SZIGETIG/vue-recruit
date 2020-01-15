<template>
  <div class="v-input">
    <x-input ref="input"
      v-model="form" v-bind="props"
      @on-focus="onFocus"
      @on-blur="onBlur">
      <template slot="label">
        <label class="weui-label">
          <span>{{title}}</span>
          <i v-if="hasHelp" class="help-text ion-md-help-circle" @click="showHelpText()"></i>
        </label>
      </template>
    </x-input>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { XInput } from '@/components/vux'
import { INPUT_TYPE } from '../constant'
import { getWebFormType } from '../util'

export default {
  name: 'VInput',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    XInput
  },
  computed: {
    props() {
      return {
        placeholder: this.placeholder || '请输入',
        max: this.rules.maxlength && Number(this.rules.maxlength),
        placeholderAlign: 'right',
        readonly: this.readonly,
        textAlign: 'right',
        type: this.inputType
      }
    },
    inputType() {
      return INPUT_TYPE[getWebFormType(this.field)] || 'text'
    }
  },
  methods: {
    onFocus () {
      setTimeout(() => {
        this.$refs.input && (this.$refs.input.isFocus = true)
      }, 0)
    },
    onBlur () {
      this.$refs.input.isFocus = true
      setTimeout(() => {
        this.$refs.input && (this.$refs.input.isFocus = false)
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
