import styled from 'styled-components';
import { createRef } from 'react';
import {
  CSS_FONT_SIZES,
  CSS_SPACINGS,
  CSS_COLORS,
} from '@styles/variables.styles';
import {
  validationMaxLength,
  validationNumber,
  validationPattern,
  validationRequired,
  Validator,
} from '@utils/validators';
import React from 'react';
import { ArrayUtils } from '@utils/array';

type InputType = 'text' | 'number';

export interface InputField {
  name: string;
  value: string;
  isRequired?: boolean;
  type?: InputType;
  maxLength?: number;
  onUpdated?: (value: string) => void;
  formatFn?: (value: string) => string;
  valid?: (fn) => boolean;
  pattern?: string;
  label: string;
  /* So far, there is no implementation right now to pass validators but the idea is to have the chance to override it, 
  in case there is a requirement to have custom messages for certain validations */
  validators?: Validator[];
}

interface InputFieldState {
  value: string;
  focused: boolean;
  classes: string[];
  errorMessage: string;
  touched: boolean;
  validators: Validator[];
  isValid: boolean;
}

class InputFieldComponent extends React.Component<
  InputField,
  InputFieldState
> {
  inputEl: React.RefObject<HTMLInputElement>;

  readonly state: InputFieldState;

  constructor(props: InputField) {
    super(props);
    this.inputEl = createRef();

    this.state = {
      focused: false,
      value: this.props.value,
      classes: [],
      errorMessage: '',
      touched: false,
      isValid: false,
      validators: this.getValidators(),
    };
  }

  getValidators(): Validator[] {
    const validators = [];
    const {
      name,
      maxLength,
      pattern,
      type,
      isRequired,
    } = this.props;

    if (isRequired) {
      validators.push(validationRequired(name));
    }
    if (type === 'number') {
      validators.push(validationNumber(name));
    }
    if (!!maxLength) {
      validators.push(validationMaxLength(name, maxLength));
    }
    if (!!pattern) {
      validators.push(validationPattern(name, pattern));
    }
    return validators;
  }

  setValue(value: string) {
    this.setState({ value });
    this.props.onUpdated && this.props.onUpdated(value);
    this.toggleValueClass(!!value);
  }

  focusInput() {
    this.inputEl.current.focus();
  }

  setFocus(focused?: boolean) {
    this.toggleFocusClasses(focused);
    if (this.state.touched && !focused) {
      this.validate();
    }
  }

  isValid() {
    return this.state.isValid;
  }

  validate() {
    let errorMessage = '';
    const isValid = this.state.validators.some(
      (validator) => {
        const isValid = validator.fn(this.state.value);
        if (!isValid) {
          errorMessage = validator.message;
        }
        return isValid;
      }
    );

    this.setState({ errorMessage, isValid });
    this.toggleValidationClasses(isValid);
  }

  render() {
    return (
      <Container
        className={[...this.state.classes]}
        onClick={() => this.focusInput()}
      >
        <input
          name={this.props.name as string}
          type="text"
          ref={this.inputEl}
          maxLength={this.props.maxLength}
          defaultValue={this.state.value}
          onFocus={() => this.setFocus(true)}
          onBlur={() => this.setFocus(false)}
          onChange={({ target: { value } }) =>
            this.setValue(value)
          }
        />
        <label>{this.props.label}</label>
        <span className="error">
          {this.state.errorMessage}
        </span>
      </Container>
    );
  }

  private toggleValidationClasses(isValid: boolean) {
    let { classes } = this.state;
    classes = ArrayUtils.toggleItem(
      classes,
      INVALID_CLASS,
      !isValid
    );
    classes = ArrayUtils.toggleItem(
      classes,
      VALID_CLASS,
      isValid
    );

    this.setState({ classes: [...classes] });
  }

  private toggleFocusClasses(focused: boolean) {
    let { classes } = this.state;

    if (!this.state.touched) {
      this.setState({
        touched: true,
      });
      classes = ArrayUtils.toggleItem(
        classes,
        TOUCHED_CLASS,
        true
      );
    }

    classes = ArrayUtils.toggleItem(
      classes,
      FOCUS_CLASS,
      focused
    );

    this.setState({ classes });
  }

  private toggleValueClass(hasValue: boolean) {
    let { classes } = this.state;

    classes = ArrayUtils.toggleItem(
      classes,
      HAS_VALUE_CLASS,
      hasValue
    );

    this.setState({ classes });
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: ${CSS_FONT_SIZES.x3};
  width: 100%;
  margin: ${CSS_SPACINGS.x3};
  cursor: text;

  label {
    position: absolute;
    margin-top: ${CSS_SPACINGS.x4};
    top: 0;
    bottom: 0;
    left: 0;
    transition: all 0.3s ease-in-out;
  }

  input {
    border-width: 0 0 1px 0;
    border-style: dashed;
    color: ${CSS_COLORS.grey50};
    margin: ${CSS_SPACINGS.x4} 0 ${CSS_SPACINGS.x2};
    outline: 0;
    padding: ${CSS_SPACINGS.x1} 0 ${CSS_SPACINGS.x2};

    :active {
      border-width: 0 0 1px 0;
    }
  }

  .error {
    color: ${CSS_COLORS.red30};
  }

  & :not(.invalid) {
    .error {
      display: none;
    }
  }

  &.focused,
  &.has-value {
    label {
      margin-top: 0px;
      font-size: ${CSS_FONT_SIZES.x2};
    }
  }

  &.touched {
    &.invalid {
      .error {
        display: block;
      }

      input {
        color: ${CSS_COLORS.red30};
        border-style: solid;
        border-color: ${CSS_COLORS.red30};
      }
    }

    &.valid {
      input {
        color: ${CSS_COLORS.green30};
        border-style: solid;
        border-color: ${CSS_COLORS.green30};
      }
    }
  }
`;

const FOCUS_CLASS = 'focused';
const HAS_VALUE_CLASS = 'has-value';
const INVALID_CLASS = 'invalid';
const VALID_CLASS = 'valid';
const TOUCHED_CLASS = 'touched';

export default InputFieldComponent;
