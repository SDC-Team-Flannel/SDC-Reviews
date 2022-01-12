import React, { useState } from 'react';
import styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = ({ cart = [], removeItemFromCart }) => {
  const [showing, setShowing] = useState(false);

  return (
    <Container onMouseEnter={() => setShowing(true)} onMouseLeave={() => setShowing(false)}>
      <Header>
        {cart.length > 0 && <Notifs>{cart.length}</Notifs>}
        <FontAwesomeIcon icon={faShoppingCart} />
      </Header>
      {showing && (
        <Items>
          {cart.map((p, i) => (
            <Item key={i} onClick={() => removeItemFromCart(p.style_id)}>
              <p>{p.name}</p>
              <img src={p.url} />
            </Item>
          ))}
        </Items>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  min-height: 60px;
  right: 221px;
  top: 0px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  opacity: 0.95;
  cursor: pointer;
`;

const Header = styled.span`
  height: 60px;
  width: 170px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  justify-content: right;
`;

const Items = styled.div`
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 199px;
  background-color: ${(props) => props.theme.bgNav};
  background-color: purple;
  color: ${(props) => props.theme.textInv};
  background-color: ${(props) => props.theme.bgNav};
  padding: 0px;
  margin: 0px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 5px 10px;
  font-size: 0.7em;
  justify-content: space-between;
  :hover {
    background-color: ${(props) => props.theme.graph};
  }
  img {
    height: 24px;
  }
  p {
    margin-left: 5px;
  }
`;

const Notifs = styled.div`
  background-color: red;
  width: 20px;
  height: 20px;
  margin-right: 6px;
  border-radius: 10px;
  font-size: 0.8em;
  line-height: 20px;
  text-align: center;
`;

export default Cart;
