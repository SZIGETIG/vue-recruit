<template>
  <div class="v-radio-other">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">{{title}}</label>
      </div>
    </div>
    <radio ref="radio" v-model="form" v-bind="props"></radio>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { Radio } from '@/components/vux'

export default {
  name: 'VRadioOther',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    Radio
  },
  computed: {
    props() {
      return {
        title: this.title,
        placeholder: this.placeholder || '请选择',
        options: this.options,
        fillMode: this.fillMode,
        fillLabel: this.otherTitle,
        fillPlaceholder: this.otherOptionPlaceholder,
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
    },
    fillMode() {
      return !!this.otherOptionLabel
    },
    otherTitle() {
      return this.field['#other__title']
    },
    otherOptionLabel() {
      return this.field['#other__option_label']
    },
    otherOptionPlaceholder() {
      return this.field['#other__placeholder']
    }
  },
  mounted () {
    this.syncOtherValue(this.value)
  },
  watch: {
    value(newValue) {
      this.syncOtherValue(newValue)
    }
  },
  methods: {
    syncOtherValue(value) {
      if (this.options.every(option => option.key !== value)) {
        this.$refs['radio'].fillValue = value
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
