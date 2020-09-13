import { CardItem } from '@sdk/cards/card.model';
import styled from 'styled-components';
import React from 'react';
import { Button } from '@components/button/Button.component';
import CardItemContainer from './CardItem.container';
import { CSS_SPACINGS } from '@styles/variables.styles';
import { CardActions } from '@sdk/cards/card.action';
import FormContainer from '@components/fom/Form.container';
import { InputField } from '@components/input-field/InputFileld.component';
import store from '@sdk/store';

type CardItemDetails = CardItem & {
  isEditionMode: boolean;
};

interface CardDetailsState extends CardItem {}
class CardDetailsContainer extends React.Component<
  CardItemDetails,
  CardDetailsState
> {
  controls: InputField[] = this.generateControls();

  constructor(props: CardItemDetails) {
    super(props);
    this.state = {
      name: this.props.name,
      cvc: this.props.cvc,
      expiryDate: this.props.expiryDate,
      number: this.props.number,
      id: this.props.id,
    };
  }

  submitCard() {
    store.dispatch(
      this.props.isEditionMode
        ? CardActions.update(this.state)
        : CardActions.add(this.state)
    );
  }

  updateCardValue = (card: CardItem) => {
    this.setState(card);
  };

  render() {
    return (
      <Container>
        <CardItemContainer
          {...this.state}
        ></CardItemContainer>
        <FormContainer<CardItem>
          controls={this.controls}
          formValue={this.state}
          updated={this.updateCardValue}
          isInitialized={this.props.isEditionMode}
          onSubmit={() => this.submitCard()}
        ></FormContainer>
        <Actions>
          <Button disabled>Delete card</Button>
        </Actions>
      </Container>
    );
  }

  private generateControls(): InputField[] {
    return [
      {
        label: 'Name in card',
        name: 'name',
        value: this.props.name,
        isRequired: true,
      },
      {
        name: 'number',
        label: 'Card number',
        value: this.props.number,
        isRequired: true,
        maxLength: 16,
        type: 'number',
      },
      {
        name: 'expiryDate',
        label: 'Expiracy date',
        value: this.props.expiryDate,
        isRequired: true,
        maxLength: 5,
        pattern: '^(0[1-9]|1[0-2])/([0-9]{2})$',
      },
      {
        name: 'cvc',
        label: 'CVC (Security code)',
        value: this.props.cvc,
        isRequired: true,
        maxLength: 3,
        type: 'number',
      },
    ];
  }
}

export default CardDetailsContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${CSS_SPACINGS.x2} ${CSS_SPACINGS.x3};
`;

const Actions = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${CSS_SPACINGS.x2};
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;
