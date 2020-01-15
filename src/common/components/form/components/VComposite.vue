<template>
  <section class="v-composite">
    <h4 class="title">
      <span>{{title}}</span>
      <i v-if="hasHelp" class="help-text ion-md-help-circle" @click="showHelpText()"></i>
    </h4>
    <div v-for="(item, itemIndex) in form" :key="itemIndex" class="composite-item">
      <divider></divider>
      <h4 class="item-title">
        <span></span>
        <img class="remove-img" src="assets/remove.png" alt="删除" @click="removeCompositeItem(itemIndex)">
      </h4>
      <dynamic-component v-for="([fieldKey, fieldValue], index) in fields" :key="index" v-model="form[itemIndex]" :field-name="fieldKey" :field="fieldValue"></dynamic-component>
    </div>
    <x-button class="add-btn" action-type="button" plain @click.native="addCompositeItem()">
      <i class="ion-md-add"></i>
      <span>添加</span>
    </x-button>
  </section>
</template>

<script>
import { FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN } from './mixin'
import { getFieldsFromFormMateData } from '../util'
import { XButton } from '@/components/vux'

export default {
  name: 'VComposite',
  mixins: [FORM_COMPONENT_MIXIN, FIELD_COMPONENT_MIXIN],
  components: {
    XButton
  },
  computed: {
    form: {
      get: function() {
        !this.value && this.$emit('input', [])
        return this.value
      },
      set: function(value) {
        this.$emit('input', value)
      }
    },
    props() {
      return {
        title: this.title
      }
    },
    fields() {
      return getFieldsFromFormMateData(this.field['#webform_composite_elements'])
    },
    valid() {
      const valueValid = this.required.valid
      const childrenValid = this.children.every(child => child.valid !== undefined ? child.valid : true)
      return valueValid && childrenValid
    }
  },
  methods: {
    addCompositeItem() {
      this.form.push({})
    },
    removeCompositeItem(index) {
      this.form.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.v-composite {
  .add-btn {
    width: 315px;
    height: @fieldHeight;
    margin: 10px auto;
    border-radius: 24px;
    border: 2px dashed @colorPrimary;
    color: @colorPrimary;
    font-size: @fontSizeSm;
    span {
      margin: 0 10px;
    }
  }
  .title,
  .item-title {
    margin: 0;
    padding: @cellPaddingTotal;
  }
  .item-title {
    .flex-box-row;
    justify-content: space-between;
    padding-top: 0;
    padding-bottom: 0;
    .remove-img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
