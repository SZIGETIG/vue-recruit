import { replaceTextToken } from '../util'

export const FORM_COMPONENT_MIXIN = {
  props: {
    value: {
      type: [String, Object, Array, Number, Boolean]
    },
    field: {
      type: Object,
      default: function () {
        return {}
      }
    },
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    form: {
      get: function () {
        return this.value
      },
      set: function (value) {
        this.$emit('input', value)
      }
    },
    title() {
      return this.field['#title'] || ''
    },
    placeholder() {
      return this.field['#placeholder']
    },
    readonly() {
      return !!this.field['#readonly']
    },
    disabled() {
      return !!this.field['#disabled']
    },
    help() {
      return {
        title: this.replaceHelpToken(this.field['#help_title']),
        text: this.replaceHelpToken(this.field['#help_text'] || this.field['#help'])
      }
    },
    hasHelp() {
      return this.help.title || this.help.text
    },
    multipleCount() {
      if (this.multiple) {
        const multiple = this.field['#webform_multiple']
        return multiple === true ? Infinity : Number(multiple)
      }
      return 1
    },
    multiple() {
      const multiple = this.field['#webform_multiple']
      return !!multiple
    },
    valid() {
      return this.children.every(child => child.valid !== undefined ? child.valid : true)
    },
    rules() {
      return {
        required: !!this.field['#required'],
        pattern: this.field['#pattern'],
        length: this.field['#length'],
        minlength: this.field['#minlength'],
        maxlength: this.field['#maxlength'],
        min: this.field['#min'],
        max: this.field['#max']
      }
    },
    invalidMessage() {
      return this.children.reduce((result, child) => {
        if (child.fieldComponent) {
          return [...result, ...child.invalidMessage]
        }
        return result
      }, [])
    },
    token() {
      return this.field['#token'] || {}
    },
    helpToken() {
      return this.token['help']
    },
    replaceHelpToken() {
      return text => replaceTextToken(text, this.helpToken, this.formData)
    }
  },
  methods: {
    showHelpText() {
      this.$vux.alert.show({
        title: this.help.title || this.title,
        content: this.help.text,
        buttonText: '关闭'
      })
    }
  }
}

export const FIELD_COMPONENT_MIXIN = {
  data() {
    return {
      fieldComponent: true
    }
  },
  computed: {
    valid() {
      return this.allRulesValid
    },
    invalidMessage() {
      const ruleNames = ['required', 'pattern']
      return ruleNames.map(ruleName => this[ruleName]).filter(validation => !validation.valid).map(validation => validation.message)
    },
    allRulesValid() {
      return this.required.valid && this.pattern.valid && this.lengthValid && this.rangeValid
    },
    required() {
      const valid = this.rules.required ? !!this.form && this.form !== 0 && this.form.length !== 0 : true
      return {
        valid,
        message: this.field['#required_error'] || `必须填写${this.title}`
      }
    },
    lengthValid() {
      const length = this.rules.length
      const minlength = this.rules.minlength
      const maxlength = this.rules.maxlength
      return (length ? new RegExp(`^.{${minlength}}$`).test(this.form) : true)
        && (minlength ? new RegExp(`^.{${minlength},}$`).test(this.form) : true)
        && (maxlength ? new RegExp(`^.{0,${maxlength}}$`).test(this.form) : true)
    },
    rangeValid() {
      const min = this.rules.min
      const max = this.rules.max
      return (min ? (Number(min) <= this.form) : true)
        && (max ? (Number(max) >= this.form) : true)
    },
    pattern() {
      const pattern = this.rules.pattern
      return {
        valid: pattern ? new RegExp(pattern).test(this.form) : true,
        message: this.field['#pattern_error']
      }
    },
    optionToken() {
      return this.token['option']
    },
    replaceOptionToken() {
      return text => replaceTextToken(text, this.optionToken, this.formData)
    },
    allOptions() {
      return Object.entries(this.field['#options'] || {})
    },
    filterOption() {
      return value => {
        const filters = this.field['#filter']
        if (!filters) {
          // if there is no filter, do not filter any value
          return true
        }
        // *OR* iterate all rules and return true once any matched
        return Object.entries(filters).some(([fieldKey, rules]) => {
          // get target filed value
          const fieldValue = this.formData[fieldKey]
          /*
            if target value is multiple, combine all related rules
            else just return single rule
          */
          const filterValue = fieldValue instanceof Array ? fieldValue.reduce((results, item) => {
            return rules[item] ? [...results, ...rules[item]] : results
          }, []) : rules[fieldValue] || []
          /*
            if the field value is in filter options, return filter result
            else return other result
          */
          return filterValue.length > 0 ? filterValue.includes(value) : (rules['other'] || []).includes(value)
        })
      }
    }
  }
}
