import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ls from 'local-storage';
import { Button } from '../Shared/Form';

const UpdateCart = ({ style, product, addToCart }) => {
  //Define Variables for Functional Component
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [warning, setWarning] = useState(false);
  let sizes;
  let availableQuantities;
  let quantities;

  //If the user switches the style, then reset the state
  useEffect(() => {
    setSelectedSize(0);
    setSelectedQuantity(0);
  }, [style, product]);

  //Handle a click on the cart
  let handleAddCartClick = (validation) => {
    if (selectedSize === 0 && validation === true) {
      setWarning(true);
    } else {
      addToCart({
        style_id: style.style_id,
        name: product.name,
        url: style.photos && style.photos[0] ? style.photos[0].thumbnail_url : '',
      });
      setSelectedSize(0);
      setSelectedQuantity(0);
    }
  };
  //If the style is not defined, then we simply return a Button
  if (!style || !style.skus || Object.keys(style.skus)[0] === 'null') {
    return <Button>OUT OF STOCK</Button>;
  }

  //Update the sizes/quantities/available quantities
  sizes = Object.keys(style.skus).map((x) => style.skus[x].size);
  sizes.unshift('Select Size');

  quantities = Object.keys(style.skus).map((x) => style.skus[x].quantity);

  availableQuantities = new Array(Math.min(15, quantities[Math.max(0, selectedSize - 1)]))
    .fill(0)
    .map((x, i) => i + 1);

  //Update the sizes/quantities/available quantities
  return (
    <Container>
      {warning && <Warning>Please select size</Warning>}
      <Selections>
        <SizeSelection
          onChange={(e) => {
            setSelectedSize(parseInt(e.target.value));
            setSelectedQuantity(0);
            setWarning(false);
          }}
          value={selectedSize}
        >
          {sizes.map((size, i) => (
            <option key={i} value={i}>
              {size}
            </option>
          ))}
        </SizeSelection>
        {selectedSize > 0 ? (
          <QuantitySelection
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value))}
          >
            {availableQuantities.map((quantity, i) => (
              <option key={i} value={i}>
                {quantity}
              </option>
            ))}
          </QuantitySelection>
        ) : (
          <QuantitySelection disabled>
            <option>-</option>
          </QuantitySelection>
        )}
      </Selections>
      <Button onClick={() => handleAddCartClick(true)}>Add to Cart</Button>
    </Container>
  );
};

export default UpdateCart;

const Selections = styled.div`
  display: flex;
`;

const Warning = styled.div`
  color: red;
`;

const Container = styled.div`
  width: 100%;
  justify-content: space-between;
`;

const SizeSelection = styled.select`
  width: 50%;
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textDark};
`;

const QuantitySelection = styled.select`
  width: 50%;
  padding: 10px;
  margin-right: 5px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textDark};
`;
