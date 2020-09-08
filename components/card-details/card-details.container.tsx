import { CardItem } from '@sdk/cards/card-item.model';
import styled from 'styled-components';
import { FunctionComponent } from 'react';

export interface CardDetails {
  item?: CardItem;
}

export const CardDetailsContainer: FunctionComponent<CardDetails> = () => {
  return (
    <Container>
      <button>Confirm</button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3rem;
`;
