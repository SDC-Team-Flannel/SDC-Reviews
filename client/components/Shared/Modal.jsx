import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Modal = ({ children, onClose, width = 50, height = 50, id = 'modal' }) => {
  const [z, setZ] = useState(100000);

  useEffect(() => {
    setZ(z - 1);
  }, [children]);

  width = Math.max(10, Math.min(90, width));
  height = Math.max(10, Math.min(90, height));
  return (
    <Container width={width} height={height} z={z} id={id}>
      <CloseButton onClick={onClose}>×</CloseButton>
      {children}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  z-index: ${(props) => props.z};
  width: ${(props) => props.width}%;
  height: ${(props) => props.height}%;
  left: ${(props) => (100 - props.width) / 2}%;
  top: ${(props) => Math.min(10, (100 - props.height) / 2)}%;
  overflow: auto;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: ${(props) => props.theme.bgLight};
  scroll-behavior: smooth;
`;

const CloseButton = styled.button`
  color: ${(props) => props.theme.textDark};
  -webkit-text-stroke: 1px ${(props) => props.theme.textInv};
  position: absolute;
  top: 0px;
  right: 0px;
  width: 40px;
  height: 40px;
  font-size: 2em;
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.textLight};
  }
`;
