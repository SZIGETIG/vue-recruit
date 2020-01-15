import { WEB_FORM_TYPE, WEB_FORM_COMPONENT_TYPE } from './constant'

export const getOnboardingFromStep = (onboardingForm, step) => onboardingForm[`step${step}`] || {}

export const getFieldsFromFormMateData = formMateData => {
  return Object.entries(formMateData).filter(([key,]) => !key.startsWith('#'))
}

export const getWebFormType = field => field['#type']

export const getWebFormComponentType = field => WEB_FORM_COMPONENT_TYPE[getWebFormType(field)]

export const isSection = field => getWebFormType(field) === WEB_FORM_TYPE.WEBFORM_SECTION

export const isComposite = field => getWebFormType(field) === WEB_FORM_TYPE.WEBFORM_CUSTOM_COMPOSITE

export const isHidden = field => getWebFormType(field) === WEB_FORM_TYPE.HIDDEN

export const isImageFile = field => getWebFormType(field) === WEB_FORM_TYPE.WEBFORM_IMAGE_FILE

export const needWrap = (title = '') => title.length > 4

export const replaceTextToken = (text, token, formData) => {
  if (!token || !text) {
    return text
  }
  Object.entries(token).forEach(([tokenName, tokenObj]) => {
    Object.entries(tokenObj).filter(([fieldName,]) => fieldName !== 'default').forEach(([fieldName, tokenValueObj]) => {
      const tokenValue = tokenValueObj[formData[fieldName]]
      text = text.replace(new RegExp(`{${tokenName}}`, 'g'), tokenValue || tokenObj.default)
    })
  })
  return text
}

export const CONDITION_HANDLER = {
  visible: (condition = {}, form) => {
    if (Array.isArray(condition)) {
      const results = condition.map(valueObj => {
        if (typeof valueObj === 'string') {
          const conditionMap = {
            or: '||',
            and: '&&'
          }
          return conditionMap[valueObj]
        }
        return handleConditionRule(valueObj, form)
      })
      return eval(results.join(' '))
    } else {
      return handleConditionRule(condition, form)
    }
  }
}

function handleConditionRule(condition, form) {
  return Object.entries(condition).every(([key, valueObj]) => {
    const target = /:input\[name="([a-z_]+).*"\]/i.exec(key)
    if (target) {
      const targetValue = form[target['1']]
      const value = valueObj.value
      if (typeof value === 'string') {
        // value is
        return targetValue === value
      } else if (typeof value === 'object') {
        // pattern is
        return new RegExp(value.pattern).test(targetValue)
      }
    }
    return false
  })
}
