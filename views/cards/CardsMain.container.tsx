import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ModalContainer from '@components/modal/modal.container';
import { AnimatePresence } from 'framer-motion';
import {
  CSS_COLORS,
  CSS_SPACINGS,
} from '@styles/variables.styles';
import CardItemContainer from './CardItem.container';
import { CARD_DETAILS_MODAL_ID } from './cards.const';
import { Button } from '@components/button/Button.component';
import { CardSelector } from '@sdk/cards/card.selector';
import { useDispatch } from 'react-redux';
import { CardActions } from '@sdk/cards/card.action';
import CardDetailsContainer from './CardDetails.container';

export function CardsMainContainer() {
  const cards = CardSelector.getAll();
  const dispatch = useDispatch();

  const [modalOpened, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isEditionMode, setEditionMode] = useState(false);

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

  const addNewCard = () => {
    setEditionMode(false);
    setOpenModal(true);
  };

  const editCard = (card) => {
    setOpenModal(true);
    setEditionMode(true);
    setSelectedCard(card);
  };

  return (
    <>
      <Header>
        <h1>Your cards</h1>
        <p>Add, edit or delete your cards any time</p>
      </Header>
      <Container>
        <CardsContainer>
          {cards.map((card) => (
            <CardItemContainer
              {...card}
              onEditClick={() => editCard(card)}
              key={card.number}
            ></CardItemContainer>
          ))}
        </CardsContainer>

        <Button onClick={addNewCard}>Add new card</Button>
      </Container>

      {/* TODO: Move AnimatePresence to a ModalProvider class and wrap the open/close logic */}
      <AnimatePresence>
        {modalOpened ? (
          <ModalContainer
            onClose={closeDialog}
            id={CARD_DETAILS_MODAL_ID}
            title={
              isEditionMode
                ? 'Edit you card'
                : 'Add your card details'
            }
          >
            <CardDetailsContainer
              isEditionMode={isEditionMode}
              {...selectedCard}
            ></CardDetailsContainer>
          </ModalContainer>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardsContainer = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: ${CSS_SPACINGS.x5};
`;

const Header = styled.header`
  padding: ${CSS_SPACINGS.x4} ${CSS_SPACINGS.x8};
  h1 {
    color: ${CSS_COLORS.purple};
  }
`;
