import styled from 'styled-components';
import {
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import React from 'react';
import InputFieldComponent, {
  InputField,
} from '@components/input-field/InputFileld.component';
import { Button } from '@components/button/Button.component';
import { CSS_SPACINGS } from '@styles/variables.styles';

interface FormState<T extends object> {
  value: T;
  isValid: boolean;
  inputRefs: React.RefObject<InputFieldComponent>[];
}

export interface Form<T extends object> {
  isValid?: boolean;
  controls: InputField[];
  formValue: T;
  isInitialized?: boolean;
  onSubmit: () => void;
  markAsTouched?: () => void;
  updated?: (value: T) => void;
}

class FormContainer<
  T extends object
> extends React.Component<Form<T>, FormState<T>> {
  readonly state: FormState<T>;

  constructor(props: Form<T>) {
    super(props);

    this.state = {
      isValid: false,
      value: this.props.formValue,
      inputRefs: this.getInputRefs(),
    };
  }

  submit(ev) {
    ev.preventDefault();

    if (this.validate() && this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  componentDidMount() {
    if (this.props.isInitialized) {
      this.markWithValue();
    }
  }

  validate() {
    let isValid = true;
    this.state.inputRefs.forEach(({ current }) => {
      current.validate();
      if (isValid && !current.isValid()) {
        isValid = false;
      }
    });

    return isValid;
  }

  markWithValue() {
    this.state.inputRefs.forEach(({ current }) =>
      current.markWithValue()
    );
  }

  render() {
    return (
      <Form>
        {this.props.controls.map((control, index) => (
          <InputFieldComponent
            ref={this.state.inputRefs[index]}
            key={control.name}
            {...control}
          ></InputFieldComponent>
        ))}

        <Button onClick={(ev) => this.submit(ev)}>
          Confirm
        </Button>
      </Form>
    );
  }

  private getInputRefs(): React.RefObject<
    InputFieldComponent
  >[] {
    return this.props.controls.reduce(
      (allRefs, control) => {
        allRefs.push(createRef<InputFieldComponent>());
        control.onUpdated = (updatedValue) => {
          const value = {
            ...this.state.value,
            ...{ [control.name]: updatedValue },
          };
          this.setState({
            value,
          });
          this.props.updated(value);
        };
        return allRefs;
      },
      []
    );
  }
}

export default FormContainer;

const Form = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${CSS_SPACINGS.x2};
`;
