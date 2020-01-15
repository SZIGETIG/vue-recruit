<template>
  <section class="v-section">
    <divider></divider>
    <h4 class="title">
      <span>{{title}}</span>
      <i v-if="hasHelp" class="help-text ion-md-help-circle" @click="showHelpText()"></i>
    </h4>
    <dynamic-component v-for="([fieldKey, fieldValue], index) in fields" :key="index"
      v-model="form" :field-name="fieldKey" :field="fieldValue"></dynamic-component>
  </section>
</template>

<script>
import { FORM_COMPONENT_MIXIN } from './mixin'
import { getFieldsFromFormMateData } from '../util'

export default {
  name: 'VSection',
  mixins: [FORM_COMPONENT_MIXIN],
  computed: {
    props() {
      return {
        title: this.title
      }
    },
    fields() {
      return getFieldsFromFormMateData(this.field)
    }
  }
}
</script>

<style lang="less" scoped>
.v-section {
  .title {
    margin: 0;
    padding: @cellPaddingTotal;
  }
}
</style>
