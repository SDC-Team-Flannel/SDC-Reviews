import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from './Search';
import Cart from './Cart';
import localforage from 'localforage';
import axios from 'axios';

export const Header = ({
  product,
  products,
  updateProduct,
  toggleColors,
  cart,
  removeItemFromCart,
}) => {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    let message = await axios.get('/messages');
    setMessage(message.data.message);
  };

  useEffect(() => {
    fetchMessage();
  }, [product]);

  return (
    <>
      <Navbar>
        <div>
          <h1>
            CatWalk <Toggle onClick={toggleColors}>&#9829;</Toggle>
          </h1>
        </div>
        <Container>
          <Cart cart={cart} removeItemFromCart={removeItemFromCart} />
          <Search items={products} updateProduct={updateProduct} />
        </Container>
      </Navbar>
      <Announcements>
        <marquee>{message}</marquee>
      </Announcements>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Navbar = styled.div`
  position: fixed;
  z-index: 10;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 60px;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  color: ${(props) => props.theme.textInv};

  background-color: ${(props) => props.theme.bgNav};
  h1 {
    font-size: 22px;
  }
  svg {
    color: ${(props) => props.theme.textInv};
  }
`;

const Announcements = styled.div`
  height: 30px;
  line-height: 30px;
  width: 100%;
  background-color: ${(props) => props.theme.highlight};
`;

const Toggle = styled.a`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export default Header;
