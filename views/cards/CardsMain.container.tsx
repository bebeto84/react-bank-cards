import React, { useEffect, useState } from 'react';
import { CardItem } from '@sdk/cards/card.model';
import styled from 'styled-components';
import ModalContainer from '@components/modal/modal.container';
import { AnimatePresence } from 'framer-motion';
import { CSS_COLORS } from '@styles/variables.styles';
import CardItemContainer from './CardItem.container';
import { CARD_DETAILS_MODAL_ID } from './cards.const';
import CardDetailsContainer from './CardDetails.container';
import { Button } from '@components/button/Button.component';
import { CardSelector } from '@sdk/cards/card.selector';
import { useSelector, useDispatch } from 'react-redux';
import { CardActions } from '@sdk/cards/card.action';

export function CardsMainContainer() {
  // TODO: use redux to manage `cards`
  const cards = CardSelector.getAll();
  const dispatch = useDispatch();

  const [modalOpened, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  // Note: This is not useful now, but most likely this is one of the best places to retrieve the data from Backend
  useEffect(() => {
    dispatch(CardActions.getAll());
  }, []);

  useEffect(() => {
    setOpenModal(false);
  }, [cards]);

  const closeDialog = () => {
    setSelectedCard(null);
    setOpenModal(false);
  };

  const addNewCard = () => setOpenModal(true);

  const editCard = (card) => {
    setOpenModal(true);
    setSelectedCard(card);
  };

  return (
    <>
      <header>
        <Heading>Your cards</Heading>
        <p>Add, edit or delete your cards any time</p>
      </header>

      <Container>
        {cards.map((card) => (
          <CardItemContainer
            {...card}
            onEditClick={() => editCard(card)}
            key={card.number}
          ></CardItemContainer>
        ))}
        <Button onClick={addNewCard}>Add new card</Button>
      </Container>

      {/* TODO: Move AnimatePresence to a ModalProvider class and wrap the open/close logic */}
      <AnimatePresence>
        {modalOpened ? (
          <ModalContainer
            onClose={closeDialog}
            id={CARD_DETAILS_MODAL_ID}
            title={
              !!selectedCard
                ? 'Edit you card'
                : 'Add your card details'
            }
          >
            <CardDetailsContainer
              isEditionMode={!selectedCard}
              {...selectedCard}
            ></CardDetailsContainer>
          </ModalContainer>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Heading = styled.h1`
  color: ${CSS_COLORS.purple};
`;
