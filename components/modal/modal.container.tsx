import React from 'react';
import styled from 'styled-components';
import { createModal } from '@utils/portal';
import { motion } from 'framer-motion';

const ModalContainer = ({
  id,
  onClose,
  title,
  children,
}) => {
  const closeIcon = (
    <IconContainer onClick={onClose}>X</IconContainer>
  );

  const modalMarkup = (
    <Base
      initial={{ opacity: 0, y: '200%' }} // animate from
      animate={{ opacity: 1, y: 0 }} // animate to
      exit={{ opacity: 0, y: '200%' }} // animate exit
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 40,
      }}
      positionTransition // auto animates the element when it's position changes
    >
      <ModalWrapper>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          {closeIcon}
        </ModalHeader>
        {children}
      </ModalWrapper>
    </Base>
  );

  return createModal(id, modalMarkup);
};

export default ModalContainer;

const ModalWrapper = styled.div`
  width: 100vw;
  height: 85%;
  background: white;
`;

const ModalHeader = styled.div`
  display: flex;
  font-size: 0.6875rem;
  line-height: 1.2;
  letter-spacing: 0.1rem;
  font-weight: bold;
  height: 3rem;
`;

const ModalTitle = styled.h1`
  width: 100%;
  margin: 0;
  font-weight: normal;
  line-height: 3.5;
  text-align: center;
`;

const IconContainer = styled.div`
  font-size: 1.5em;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Base = styled(motion.div)`
  /*    */
  background: rgba(0, 0, 0, 0.84);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;