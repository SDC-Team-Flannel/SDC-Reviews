import React, { useState } from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = ({ items, updateProduct }) => {
  const [query, setQuery] = useState('');
  const [showing, setShowing] = useState(false);

  let display = items.filter((x) => new RegExp(query, 'i').test(x.name));
  return (
    <>
      <Container>
        <StyledInput
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowing(true)}
          onBlur={() => setShowing(false)}
        ></StyledInput>
        <FontAwesomeIcon icon={faSearch} />
      </Container>
      {showing && (
        <Dropdown>
          <StyledUl>
            {display.map((x, i) => (
              <li
                key={i}
                onMouseDown={(e) => {
                  updateProduct(x.id);
                }}
              >
                {x.name}
              </li>
            ))}
          </StyledUl>
        </Dropdown>
      )}
    </>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  svg {
    font-size: 16px;
  }
`;

const Dropdown = styled.div`
  position: fixed;
  right: 20px;
  top: 60px;
  max-height: 400px;
  opacity: 0.95;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 200px;
  z-index: 10;
  background-color: ${(props) => props.theme.bgNav};
  color: ${(props) => props.theme.textInv};
`;

const StyledUl = styled.ul`
  background-color: ${(props) => props.theme.bgNav};
  padding: 0px;
  margin: 0px;
  li {
    list-style-type: none;
    width: 100%;
    margin: 0px;
    padding: 0px 15px;
    height: 24px;
    line-height: 24px;
    font-size: 0.8em;
  }
  li:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.graph};
  }
`;

const StyledInput = styled.input`
  background-color: transparent;
  width: 160px;
  border: 0px;
  border-bottom: 2px solid ${(props) => props.theme.textInv};
  margin-right: 10px;
  outline: none;
  color: ${(props) => props.theme.textInv};
`;
