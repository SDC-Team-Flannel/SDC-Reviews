import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchBar = ({searchInput}) => {
  return (
    <div>
      <SearchBox type='search' placeholder='Have a question? Search for answers...' onChange={searchInput}></SearchBox>
      <SearchButton type='submit'><FontAwesomeIcon icon={faSearch} /></SearchButton>
    </div>
  );
};

const Container = styled.div`
  display: inline-block;
  color: ${(props) => props.theme.textLight};
`;

const SearchBox = styled.input`
  width: 100%;
  padding: 10px 35px 10px 15px;
  border: none;
  border-radius: 100px;
  outline: none;
  height: 40px;
`;

const SearchButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-left: -33px;
`;

export default SearchBar;