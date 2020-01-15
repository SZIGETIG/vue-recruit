<template>
  <div class="v-select-other">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">{{title}}</label>
      </div>
    </div>
    <div class="options">
      <div v-for="(option, index) in options" :key="index" class="option">
        <label :for="uid(index)" class="option-label">{{option.label}}</label>
        <input v-model="selected" :id="uid(index)" class="option-input" type="checkbox" :value="option.value">
        <i class="option-checked-icon"></i>
      </div>
      <div v-if="otherOptionLabel" class="option other-option">
        <label class="other-option-label">{{otherOptionLabel}}</label>
        <input v-model="other" type="text" class="other-option-input weui-input"
          :placeholder="otherOptionPlaceholder" :maxlength="otherMaxlength && Number(otherMaxlength)">
      </div>
    </div>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'

export default {
  name: 'VSelectOther',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  data() {
    return {
      selected: [],
      other: '',
      unwatchSelected: null,
      unwatchOther: null
    }
  },
  computed: {
    uid() {
      return index => `option-${index}-${this._uid}`
    },
    options() {
      return this.allOptions.map(([value, label]) => ({
        label: this.replaceOptionToken(label),
        value
      })).filter(({ value }) => this.filterOption(value))
    },
    otherTitle() {
      return this.field['#other__title']
    },
    otherOptionLabel() {
      return this.field['#other__option_label']
    },
    otherOptionPlaceholder() {
      return this.field['#other__placeholder']
    },
    otherMaxlength() {
      return this.field['#other__maxlength']
    },
    nativeValue() {
      if (this.multiple) {
        return [...this.selected, this.other].filter(value => !!value)
      } else {
        return this.other || this.selected[0] || ''
      }
    }
  },
  created() {
    this.resolveValue(this.value)
    this.watch()
  },
  watch: {
    value(newValue) {
      this.unwatch()
      this.resolveValue(newValue)
      this.watch()
    },
    multiple(newValue) {
      if (newValue) {
        this.selected = this.value.filter(item => this.contains(item))
        const otherValue = this.value.filter(item => !this.contains(item))[0]
        this.other = otherValue || ''
      } else {
        if (this.contains(this.value)) {
          this.selected = [this.value]
        } else {
          this.other = this.value
        }
      }
    }
  },
  methods: {
    watchSelected() {
      this.unwatchSelected = this.$watch('selected', (newValue, oldValue) => {
        if (!this.multiple && newValue.length > oldValue.length) {
          this.other = ''
          this.selected = [newValue[newValue.length - 1]]
        }
        this.emitValue()
      })
    },
    watchOther() {
      this.unwatchOther = this.$watch('other', (newValue) => {
        if (!this.multiple && newValue) {
          this.selected = []
        }
        this.emitValue()
      })
    },
    watch() {
      this.watchSelected()
      this.watchOther()
    },
    unwatch() {
      this.unwatchSelected()
      this.unwatchOther()
    },
    resolveValue(value) {
      if (this.multiple && value instanceof Array) {
        this.selected = value.filter(item => this.contains(item))
        const otherValue = value.filter(item => !this.contains(item)).join(', ')
        this.other = otherValue || ''
      } else {
        if (this.contains(value)) {
          this.selected = [value]
        } else {
          this.other = value
        }
      }
    },
    contains(value) {
      return this.options.find(option => option.value === value)
    },
    emitValue() {
      this.form = this.nativeValue
    }
  }
}
</script>

<style lang="less" scoped>
.v-select-other  {
  .options {
    .option {
      .flex-box-row;
      position: relative;
      padding: @cellPaddingTotal;
      &:not(:last-child) + .option::before {
        content: '';
        border-top: 1px solid @colorBorder;
        height: 1px;
        width: calc(100% - @cellPaddingLeftTotal);
        position: absolute;
        top: 0;
      }
      .option-label {
        .flex-1;
      }
      .option-input {
        display: none;
        &:checked + .option-checked-icon::after {
          content: '\EA08';
          display: inline-block;
          color: @colorPrimary;
          font-size: @fontSizeLg;
        }
      }
      .option-checked-icon {
        display: inline-block;
        vertical-align: middle;
        font: normal normal normal 14px/1 "weui";
        font-size: inherit;
        text-rendering: auto;
      }
    }
    .other-option {
      &-label {
        width: @fieldLabelWidth;
        padding-right: @fieldPaddingRight;
      }
      &-input {
        text-align: right;
      }
    }
  }
}
</style>
