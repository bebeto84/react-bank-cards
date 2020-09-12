export interface CardItem {
  name: string;
  number: string;
  expiryDate: string;
  cvc: string;
  id?: string;
}

export interface CardsState {
  cards: CardItem[];
  currentCard?: CardItem;
}
