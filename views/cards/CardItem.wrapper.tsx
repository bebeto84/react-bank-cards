import styled from 'styled-components';
import {
  CSS_BORDER_RADIUS,
  CSS_SPACINGS,
} from '@styles/variables.styles';
import { FunctionComponent } from 'react';
import { useCardColor } from 'hooks/useCardColor';

const CardItemWrapper: FunctionComponent<{
  isVisa: boolean;
}> = ({ isVisa, children }) => {
  const backgroundColor = useCardColor(isVisa, 'lighter');
  const svgColor = useCardColor(isVisa, 'darker');
  return (
    <Container>
      <Background backgroundColor={backgroundColor}>
        <CardItemSvgImage
          fill={svgColor}
        ></CardItemSvgImage>
      </Background>
      {children}
    </Container>
  );
};

const CardItemSvgImage = ({ fill }) => (
  <svg fill={fill} height="100%" viewBox="0 0 257 184">
    <path d="M208.202 -14.271L131 101.5L7.93761 160.029C-8.05573 173.918 1.67932 201 23.2356 201H423.764C445.321 201 455.056 173.918 439.062 160.029L238.798 -14.271C230.454 -21.9097 217.242 -21.9097 208.202 -14.271Z" />
  </svg>
);

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${CSS_BORDER_RADIUS.x2};
  padding: 0 0 0 20%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -10;
`;

const Container = styled.div`
  position: relative;
  width: 440px;
  height: 270px;
  flex-direction: column;
  justify-content: space-between;
  margin: ${CSS_SPACINGS.x4};
  display: flex;
  padding: ${CSS_SPACINGS.x5};
  z-index: 0;
`;

export default CardItemWrapper;
