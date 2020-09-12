import { CardsState } from './cards/card.model';
import { cardReducer } from './cards/card.reducer';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  card: cardReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
