export const WEB_FORM_TYPE = {
    WEBFORM_WIZARD_PAGE: 'webform_wizard_page',
    WEBFORM_CUSTOM_COMPOSITE: 'webform_custom_composite',
    WEBFORM_SECTION: 'webform_section',
    TEXTFIELD: 'textfield',
    TEL: 'tel',
    EMAIL: 'email',
    DATE: 'date',
    SELECT: 'select',
    WEBFORM_SELECT_OTHER: 'webform_select_other',
    NUMBER: 'number',
    WEBFORM_ADDRESS: 'webform_address',
    CHECKBOX: 'checkbox',
    CHECKBOXES: 'checkboxes',
    RADIOS: 'radios',
    WEBFORM_RADIOS_OTHER: 'webform_radios_other',
    TABLESELECT: 'tableselect',
    HIDDEN: 'hidden',
    MANAGED_FILE: 'managed_file',
    WEBFORM_IMAGE_FILE: 'webform_image_file',
    TEXTAREA: 'textarea'
  }
  
  export const WEB_FORM_COMPONENT_TYPE = {
    [WEB_FORM_TYPE.WEBFORM_WIZARD_PAGE]: '',
    [WEB_FORM_TYPE.WEBFORM_CUSTOM_COMPOSITE]: 'VComposite',
    [WEB_FORM_TYPE.WEBFORM_SECTION]: 'VSection',
    [WEB_FORM_TYPE.TEXTFIELD]: 'VInput',
    [WEB_FORM_TYPE.TEL]: 'VInput',
    [WEB_FORM_TYPE.EMAIL]: 'VInput',
    [WEB_FORM_TYPE.DATE]: 'VDate',
    [WEB_FORM_TYPE.SELECT]: 'VSelect',
    [WEB_FORM_TYPE.WEBFORM_SELECT_OTHER]: 'VSelectOther',
    [WEB_FORM_TYPE.NUMBER]: 'VNumber',
    [WEB_FORM_TYPE.WEBFORM_ADDRESS]: 'VAddress',
    [WEB_FORM_TYPE.CHECKBOX]: 'VCheckbox',
    [WEB_FORM_TYPE.CHECKBOXES]: 'VCheckboxList',
    [WEB_FORM_TYPE.RADIOS]: 'VRadio',
    [WEB_FORM_TYPE.WEBFORM_RADIOS_OTHER]: 'VRadioOther',
    [WEB_FORM_TYPE.TABLESELECT]: 'VSelect',
    [WEB_FORM_TYPE.HIDDEN]: 'VHidden',
    [WEB_FORM_TYPE.MANAGED_FILE]: 'VFile',
    [WEB_FORM_TYPE.WEBFORM_IMAGE_FILE]: 'VFile',
    [WEB_FORM_TYPE.TEXTAREA]: 'VTextarea'
  }
  
  export const INPUT_TYPE = {
    [WEB_FORM_TYPE.TEXTFIELD]: 'text',
    [WEB_FORM_TYPE.TEL]: 'tel',
    [WEB_FORM_TYPE.EMAIL]: 'email',
  }
  