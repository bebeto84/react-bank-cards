import { CardItem } from '@sdk/cards/card-item.model';
import styled from 'styled-components';
import { FunctionComponent, useState } from 'react';
import InputFieldComponent from '@components/input-field/InputFileld.component';
import { spaceWordOnCharacters } from '@utils/string';
import { Button } from '@components/button/Button.component';
import CardItemContainer from './CardItem.container';
import { CSS_SPACINGS } from '@styles/variables.styles';

const CardDetailsContainer: FunctionComponent<CardItem> = ({
  name,
  number,
  expiryDate,
  cvc,
  children,
}) => {
  const [formValue, setFormValue] = useState({
    name,
    number,
    expiryDate,
    cvc,
  });
  const formatNumber = (word) =>
    spaceWordOnCharacters(word, 4);

  const handleSubmit = () => {};

  const updateFormValue = (prop: keyof CardItem, value) => {
    setFormValue({
      ...formValue,
      ...{ [prop]: value },
    });
  };
  return (
    <Container>
      <CardItemContainer {...formValue}></CardItemContainer>
      <Form>
        <InputFieldComponent
          name="Name in card"
          value={formValue.name}
          onUpdated={(value) =>
            updateFormValue('name', value)
          }
          isRequired
        ></InputFieldComponent>
        <InputFieldComponent
          name="Card number"
          value={formValue.number}
          formatFn={formatNumber}
          onUpdated={(value) =>
            updateFormValue('number', value)
          }
          maxLength={16}
          isRequired
          type="number"
        ></InputFieldComponent>
        <InputFieldComponent
          name="Expiracy date"
          value={formValue.expiryDate}
          onUpdated={(value) =>
            updateFormValue('expiryDate', value)
          }
          pattern="^[0-9/]*$"
          maxLength={5}
          isRequired
        ></InputFieldComponent>
        <InputFieldComponent
          name="CVC (Security code)"
          value={formValue.cvc}
          onUpdated={(value) =>
            updateFormValue('cvc', value)
          }
          isRequired
          maxLength={3}
          type="number"
        ></InputFieldComponent>
      </Form>
      <Actions>
        <Button onClick={handleSubmit}>Confirm</Button>
        <Button disabled onClick={handleSubmit}>
          Delete card
        </Button>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${CSS_SPACINGS.x2} ${CSS_SPACINGS.x3};
  z-index: 10;
`;

const Form = styled.form`
  width: 80%;
`;

const Actions = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${CSS_SPACINGS.x2};
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

export default CardDetailsContainer;
