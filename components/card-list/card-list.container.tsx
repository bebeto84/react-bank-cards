import React, { useState } from 'react';
import { CardItem } from '@sdk/cards/card-item.model';
import { CardDetailsContainer } from '@components/card-details/card-details.container';
import CardItemComponent from '@components/card-item/card-item.component';
import styled from 'styled-components';
import ModalContainer from '@components/modal/modal.container';
import { CARD_DETAILS_MODAL_ID } from '@components/card-details/card-details.const';
import { AnimatePresence } from 'framer-motion';
import { CSS_COLORS } from '@styles/variables.styles';

const CARDS: CardItem[] = [
  {
    name: 'John Cabruci',
    cvc: '009',
    expiryDate: '08/21',
    number: '553412312312312312',
  },
  {
    name: 'John Cabruci',
    cvc: '009',
    expiryDate: '12/24',
    number: '4923123188922381',
  },
];

export function CardListContainer() {
  // TODO: use redux to manage `cards`
  const [cards, setCards] = useState(CARDS);
  const [modalOpened, setOpenModal] = useState(false);

  const closeDialog = () => setOpenModal(false);

  return (
    <>
      <Heading>Your cards</Heading>
      <p>Add, edit or delete your cards any time</p>

      <Container>
        {cards.map((card) => (
          <CardItemComponent
            {...card}
            key={card.number}
          ></CardItemComponent>
        ))}
        <Button onClick={() => setOpenModal(true)}>
          Add new card
        </Button>
      </Container>

      {/* TODO: Move AnimatePresence to a ModalProvider class and wrap the open/close logic */}
      <AnimatePresence>
        {modalOpened ? (
          <ModalContainer
            onClose={closeDialog}
            id={CARD_DETAILS_MODAL_ID}
            title="Add your card details"
          >
            <CardDetailsContainer></CardDetailsContainer>
          </ModalContainer>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const Button = styled.button`
  padding: 10px;
  width: 90%;
  background-color: ${CSS_COLORS.purple60};
  cursor: pointer;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Heading = styled.h1`
  color: ${CSS_COLORS.purple};
`;
