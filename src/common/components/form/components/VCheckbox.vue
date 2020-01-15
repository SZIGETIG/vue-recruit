<template>
  <div class="v-checkbox">
    <checklist ref="checklist" v-model="form" v-bind="props"></checklist>
  </div>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { Checklist } from '@/components/vux'

export default {
  name: 'VCheckbox',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    Checklist
  },
  computed: {
    form: {
      get: function() {
        if (Array.isArray(this.value)) {
          return this.value.map(item => item == 1)
        } else {
          return [this.value == 1]
        }
      },
      set: function(value) {
        if (value.length === 0) {
          this.$emit('input', 0)
        } else if(value.length === 1) {
          this.$emit('input', value[0] ? 1 : 0)
        } else {
          this.$emit('input', (value || []).map(item => item ? 1 : 0))
        }
      }
    },
    props() {
      return {
        // title: this.title,
        options: this.options,
        max: 1
      }
    },
    options() {
      return [{
        key: true,
        value: this.title
      }]
    }
  },
  watch: {
    value() {
      const checkedElements = this.$refs['checklist'].$el.querySelectorAll('.weui-check')
      checkedElements && [...checkedElements].forEach(checkedElement => {
        const checkedLabel = checkedElement.closest('.weui-check_label').querySelector('p')
        checkedLabel.style.color = checkedElement.checked ? 'var(--primary-color)' : 'inherit'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
