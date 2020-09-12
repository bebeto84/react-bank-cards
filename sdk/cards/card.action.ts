import { CardItem } from './card.model';
import { createAction } from '@reduxjs/toolkit';

export namespace CardActions {
  const type = '[Card] ';

  export const add = createAction(
    `${type} Add new`,
    (cardItem: CardItem) => ({ payload: { cardItem } })
  );

  export const update = createAction(
    `${type} Update existent`,
    (cardItem: CardItem) => ({ payload: { cardItem } })
  );

  export const getAll = createAction(`${type} Get all`);
}
