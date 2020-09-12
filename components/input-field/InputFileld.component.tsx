import styled from 'styled-components';
import {
  useState,
  useEffect,
  FunctionComponent,
  useRef,
} from 'react';
import {
  CSS_FONT_SIZES,
  CSS_SPACINGS,
  CSS_COLORS,
} from '@styles/variables.styles';
import { addOrRemoveItem } from '@utils/array';
import usePrevious from 'hooks/usePrevious';
import { getNumericValue } from '@utils/string';

const FOCUS_CLASS = 'focused';
const HAS_VALUE_CLASS = 'has-value';

type InputType = 'text' | 'number';

interface InputField<T> {
  name: string;
  value: T;
  isRequired?: boolean;
  type?: InputType;
  maxLength?: number;
  onUpdated: (value: T) => void;
  formatFn?: (value: string) => string;
  pattern?: string;
}

const InputFieldComponent: FunctionComponent<InputField<
  any
>> = ({
  name,
  value,
  isRequired,
  maxLength,
  type = 'text',
  pattern = type === 'number' && '[0-9]+',
  onUpdated,
}) => {
  const inputEl = useRef(null);
  const [classes, setClasses] = useState([]);
  const [currentValue, setValue] = useState(value);
  const previousValue = usePrevious(currentValue);
  const [focused, setFocus] = useState(false);

  /*   useEffect(() => {
    // it cannot exist a number with pattern on this implementation
    if (type === 'number') {
      pattern = '[0-9]+';
    }
  }, []); */

  const focusInput = () => inputEl.current.focus();

  useEffect(
    () =>
      setClasses(
        addOrRemoveItem(classes, FOCUS_CLASS, focused)
      ),
    [focused]
  );

  useEffect(() => {
    if (previousValue !== currentValue) {
      if (pattern && !currentValue.match(pattern)) {
        return;
      }
      onUpdated(currentValue);

      setClasses(
        addOrRemoveItem(
          classes,
          HAS_VALUE_CLASS,
          !!currentValue
        )
      );
    }
  }, [currentValue]);

  return (
    <Container
      className={classes}
      onClick={() => focusInput()}
    >
      <input
        name={name}
        type="text"
        ref={inputEl}
        required={isRequired}
        maxLength={maxLength}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={({ target: { value } }) =>
          setValue(value)
        }
      />
      <label>{name}</label>
    </Container>
  );
};

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

  &.focused,
  &.has-value {
    label {
      margin-top: 0px;
      font-size: ${CSS_FONT_SIZES.x2};
    }
  }
`;

export default InputFieldComponent;
