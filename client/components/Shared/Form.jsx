import React from 'react';
import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textLight};
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  outline: 1px solid ${(props) => props.theme.textLight};
`;

export const Dropdown = styled.select`
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textLight};
  text-transform: uppercase;
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  border-right: 10px solid transparent;
  outline: 1px solid ${(props) => props.theme.textLight};
  font-weight: bold;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textLight};
  text-transform: uppercase;
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  outline: 1px solid ${(props) => props.theme.textLight};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.bgDark};
  }
`;

export const Textarea = styled.textarea`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textLight};
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  outline: 1px solid ${(props) => props.theme.textLight};
`;
