import styled from 'styled-components';
import {
  CSS_COLORS,
  CSS_BORDER_RADIUS,
  CSS_SPACINGS,
} from '@styles/variables.styles';

export const Button = styled.button`
  background-color: ${CSS_COLORS.purple};
  border-radius: ${CSS_BORDER_RADIUS.x3};
  width: 70%;
  max-width: 400px;
  color: ${CSS_COLORS.white};
  text-align: center;
  padding: ${CSS_SPACINGS.x3};
  cursor: pointer;

  :focus {
    outline: none;
  }

  :disabled {
    opacity: 0.5;
    background: none;
    color: ${CSS_COLORS.grey90};
    cursor: not-allowed;
  }
`;
