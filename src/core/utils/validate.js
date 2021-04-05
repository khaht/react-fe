import { i18n, validator } from 'cplus_common_library';
import { toast } from 'react-toastify';

const MIN_PASSWORD = 8;
const MAX_PASSWORD = 128;
const MIN_EMAIL = 0;
const MAX_EMAIL = 321;

const convertText = (value) => {
  let temp = '';
  if (!value) return '';
  temp = value.replace(/[\uff00-\uff61]/g, (toHalfWidth) => String.fromCharCode(toHalfWidth.charCodeAt(0) - 0xfee0));
  temp = temp.trim();
  return temp;
};

const validatePassword = (props) => {
  const {
    value, texts, minLength, maxLength, isRequired, validatePasswordStrength,
  } = props;

  // eslint-disable-next-line camelcase
  const { status, error_message, error_code } = validator({
    type: 'textfield',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || MIN_PASSWORD,
    maxLength: maxLength || MAX_PASSWORD,
    field: texts === null || texts === undefined ? undefined : texts.field,
  });

  if (status && validatePasswordStrength) {
    const regex = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{}|'])^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{}|']*$",
    );
    if (value && !regex.test(value)) {
      return {
        status: false,
        errorMessage: i18n.t('error_messages_format', {
          field: texts.field || i18n.t('default_fieldName'),
        }),
      };
    }
  }

  return { status, errorMessage: error_message, errorCode: error_code };
};

const validateEmail = (props) => {
  const {
    texts, minLength, maxLength, isRequired,
  } = props;
  const value = convertText(props.value);

  // eslint-disable-next-line camelcase
  const { status, error_message, error_code } = validator({
    type: 'email',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || MIN_EMAIL,
    maxLength: maxLength || MAX_EMAIL,
    field: texts === null || texts === undefined ? undefined : texts.field,
  });

  return { status, errorMessage: error_message, errorCode: error_code };
};

const validateText = (props) => {
  const {
    texts, minLength, maxLength, isRequired,
  } = props;

  const value = props.value.trim();

  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'textfield',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || 0,
    maxLength: maxLength || 100,
    field: texts === null || texts === undefined ? undefined : texts.field,
  });
  return { status, errorMessage: error_message };
};

const validateTextArea = (props) => {
  const {
    texts, minLength, maxLength, isRequired,
  } = props;
  const value = props.value.trim();
  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'textarea',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || 0,
    field: texts === null || texts === undefined ? undefined : texts.field,
    maxLength,
  });
  return { status, errorMessage: error_message };
};

const validateSearchInput = (props) => {
  const {
    texts, minLength, isRequired,
  } = props;
  const value = props.value.trim();
  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'search',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || 0,
    field: texts === null || texts === undefined ? undefined : texts.field,
  });
  return { status, errorMessage: error_message };
};

const validateUrlInput = (props) => {
  const {
    texts, minLength, acceptType, isRequired,
  } = props;
  const value = convertText(props.value);
  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'url',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || 0,
    acceptType,
    field: texts === null || texts === undefined ? undefined : texts.field,
  });
  return { status, errorMessage: error_message };
};

const validateCountryInput = (props) => {
  const {
    texts, minLength, isRequired,
  } = props;
  const value = convertText(props.value);
  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'country',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || 2,
    field: texts === null || texts === undefined ? undefined : texts.field,
    isComponent: true,
  });
  return { status, errorMessage: error_message };
};

const validatePostalInput = (props) => {
  const {
    texts, minLength, isRequired,
  } = props;
  const value = convertText(props.value);
  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'postal',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || 3,
    field: texts === null || texts === undefined ? undefined : texts.field,
  });
  return { status, errorMessage: error_message };
};

const validateNumberInput = (props) => {
  const {
    texts, isRequired, isDecimal,
  } = props;
  const value = convertText(props.value);
  const min = props.min !== undefined ? props.min : 1;
  const max = props.max !== undefined ? props.max : 9999999999999998;
  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'integerDecimal',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    max,
    min,
    field: texts === null || texts === undefined ? undefined : texts.field,
    isDecimal,
    isComponent: true,
  });
  return { status, errorMessage: error_message };
};

const validatePhoneInput = (props) => {
  const {
    texts, isRequired, minLength,
  } = props;

  const value = convertText(props.value);

  // eslint-disable-next-line camelcase
  const { status, error_message } = validator({
    type: 'phone',
    data: value,
    isRequired: isRequired || false,
    error: texts === null || texts === undefined ? undefined : texts.validate,
    minLength: minLength || 3,
    field: texts === null || texts === undefined ? undefined : texts.field,
    isComponent: true,
  });

  return { status, errorMessage: error_message };
};

const validate = (props) => {
  const { type } = props;

  switch (type) {
    case 'text':
      return validateText(props);
    case 'email':
      return validateEmail(props);
    case 'password':
      return validatePassword(props);
    case 'textarea':
      return validateTextArea(props);
    case 'single':
    case 'multi':
      return validateSearchInput(props);
    case 'url':
      return validateUrlInput(props);
    case 'country':
      return validateCountryInput(props);
    case 'postal':
      return validatePostalInput(props);
    case 'number':
      return validateNumberInput(props);
    case 'phone':
      return validatePhoneInput(props);
    default:
      return {
        status: true,
        errorMessage: '',
      };
  }
};

const validateOne = (data) => {
  const check = validate(data);
  if (!check.status) {
    data.innerRef.current.focus();
    data.innerRef.current.blur();
    toast.error(check.errorMessage);
    return false;
  }
  return true;
};

const validateAll = (arr) => {
  let result = true;
  Object.keys(arr).forEach((item) => {
    if (!validateOne(arr[item])) {
      result = false;
    }
  });
  return result;
};

export { validateOne, validateAll, validate };
