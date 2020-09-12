import { CardItem } from '@sdk/cards/card-item.model';
import styled from 'styled-components';
import {
  CSS_SPACINGS,
  CSS_BORDER_RADIUS,
  CSS_COLORS,
  CSS_FONT_SIZES,
} from '@styles/variables.styles';
import { spaceWordOnCharacters } from '@utils/string';
import CardItemWrapper from './CardItem.wrapper';

interface ICardItemComponent extends CardItem {
  onEditClick?: () => void;
}

const CardItemContainer = ({
  name,
  number,
  expiryDate,
  cvc,
  onEditClick,
}: ICardItemComponent) => {
  const isVisa = number?.startsWith('4');
  const isEditable = !!onEditClick;
  return (
    <CardItemWrapper isVisa={isVisa}>
      <Heading>
        {isVisa ? <VisaLogo /> : <MasterCardLogo />}
        <Cvc>
          <span className="heading-title">cvc</span>
          <span className="heading-value"> {cvc}</span>
        </Cvc>
        <ExpiryDate>
          <span className="heading-title">Expires</span>
          <span className="heading-value">
            {expiryDate}
          </span>
        </ExpiryDate>
      </Heading>
      <OwnerName>{name}</OwnerName>
      <Bottom>
        <CardNumber>
          {number && spaceWordOnCharacters(number, 4)}
        </CardNumber>
        {isEditable && (
          <EditCardButton
            onClick={() => onEditClick()}
          ></EditCardButton>
        )}
      </Bottom>
    </CardItemWrapper>
  );
};

const Heading = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
const VisaLogo = styled(Logo).attrs({
  src: 'visa-logo.svg',
})``;
const MasterCardLogo = styled(Logo).attrs({
  src: 'mastercard-logo.svg',
})``;

const HeadingProp = styled.div`
  display: flex;
  flex-direction: column;

  .heading-title {
    font-size: ${CSS_FONT_SIZES.x1};
    text-align: right;
    text-transform: uppercase;
    color: ${CSS_COLORS.grey50};
  }
  .heading-value {
    font-size: ${CSS_FONT_SIZES.x3};
    color: ${CSS_COLORS.white};
  }
`;

const Cvc = styled(HeadingProp)`
  margin-left: auto;
  margin-right: ${CSS_SPACINGS.x3};
`;
const ExpiryDate = styled(HeadingProp)``;
const OwnerName = styled.div`
  margin-top: auto;
  color: ${CSS_COLORS.white};
  font-size: ${CSS_FONT_SIZES.x3};
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardNumber = styled.div`
  color: ${CSS_COLORS.grey50};
  margin-top: ${CSS_SPACINGS.x3};
  font-size: ${CSS_FONT_SIZES.x3};
  word-spacing: ${CSS_SPACINGS.x3};
`;

const EditCardButton = styled.button`
  background-color: transparent;
  background-image: url('edit-icon.svg');
  background-repeat: no-repeat;
  cursor: pointer;
  border: none;
  background-position: center;
  background-size: contain;
  transition: all 0.3s;
  width: 20px;
  :focus {
    outline: none;
  }
  :hover {
    width: 25px;
  }
  :active {
    transform: translateY(4px);
  }
`;

export default CardItemContainer;
