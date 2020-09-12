import { createReducer } from '@reduxjs/toolkit';
import { CardActions } from './card.action';
import { CardItem, CardsState } from './card.model';
import { v4 as uuidv4 } from 'uuid';
const MOCK_CARDS: CardItem[] = [];
/*   {
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
]; */

export const cardReducer = createReducer<CardsState>(
  {
    cards: [...MOCK_CARDS],
  },
  {
    [CardActions.add.type]: (
      state,
      action: { payload: { cardItem } }
    ) => {
      return {
        ...state,
        ...{
          cards: [
            ...state.cards,
            { ...action.payload.cardItem, id: uuidv4() },
          ],
        },
      };
    },
    [CardActions.update.type]: (
      state,
      action: { payload: { cardItem } }
    ) => {
      const {
        payload: { cardItem },
      } = action;
      const cardItems = state.cards.filter(
        (card) => cardItem.id !== card.id
      );

      return {
        ...state,
        ...{
          cards: [...cardItems, cardItem],
        },
      };
    },
  }
);
