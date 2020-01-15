<template>
  <div class="v-select">
    <popup-picker ref="popupPicker" v-model="form" v-bind="props">
      <template slot="title">
        <label class="weui-label">
          <span>{{title}}</span>
          <i v-if="hasHelp" class="help-text ion-md-help-circle" @click.stop="showHelpText()"></i>
        </label>
      </template>
    </popup-picker>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { PopupPicker } from '@/components/vux'

export default {
  name: 'VSelect',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    PopupPicker
  },
  computed: {
    form: {
      get: function() {
        return this.value ? [this.value] : []
      },
      set: function(value) {
        this.$emit('input', value[0])
      }
    },
    props() {
      return {
        placeholder: this.placeholder || '请选择',
        data: this.options,
        columns: 1,
        showName: true,
        disabled: this.options.length <= 0
      }
    },
    options() {
      return this.allOptions.map(([value, name]) => ({
        name: this.replaceOptionToken(name),
        value
      })).filter(({ value }) => this.filterOption(value))
    }
  }
}
</script>

<style lang="less" scoped>

</style>
