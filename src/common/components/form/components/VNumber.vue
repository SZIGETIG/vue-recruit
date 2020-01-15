<template>
  <div class="v-number">
    <div class="number-label">
      <label class="weui-label">
        <span>{{title}}</span>
        <i v-if="hasHelp" class="help-text ion-md-help-circle" @click="showHelpText()"></i>
      </label>
    </div>
    <x-number v-model="form" v-bind="props"></x-number>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { XNumber } from '@/components/vux'

export default {
  name: 'VNumber',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    XNumber
  },
  computed: {
    form: {
      get: function() {
        return Number(this.value || Number(this.rules.min || '0'))
      },
      set: function(value) {
        this.$emit('input', value)
      }
    },
    props() {
      return {
        min: this.rules.min && Number(this.rules.min),
        max: this.rules.max && Number(this.rules.max)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.v-number {
  /deep/ .weui-cell {
    &::before {
      all: unset;
    }
    .weui-cell__ft.vux-cell-primary * {
      .vux-number-selector {
        height: 25px;
        padding: 0 8px;
        color: @colorPrimary;
        svg {
          fill: @colorPrimary;
        }
      }
      .vux-number-input {
        height: 25px;
        font-size: @fontSizeMd;
      }
    }
  }
}
</style>
