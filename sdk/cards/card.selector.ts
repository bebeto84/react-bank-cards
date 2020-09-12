import { RootState } from '@sdk/rootReducer';
import { useSelector } from 'react-redux';
import { CardItem } from './card.model';

export namespace CardSelector {
  // TODO: create a slice of the state
  // TODO: use memoization with `reselect`
  export const getAll = (): CardItem[] =>
    useSelector((state: RootState) => state.card.cards);
}
