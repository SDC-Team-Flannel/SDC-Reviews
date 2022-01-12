import React from 'react';
import styled from 'styled-components';



export const months = {
  '01': 'Jan',
  '02': 'Feb',
  '03': 'Mar',
  '04': 'Apr',
  '05': 'May',
  '06': 'Jun',
  '07': 'Jul',
  '08': 'Aug',
  '09': 'Sep',
  '10': 'Oct',
  '11': 'Nov',
  '12': 'Dec'
};

export const sortedQuestion = (a, b) => {
  return a - b;
};

export const sortedAnswer = (a, b) => {
  return b.helpfulness - a.helpfulness;
};

export const formValidation = (formData) => {
  let errors = {};

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
    errors.email = 'email must be in xxx@yyy.com format';
  }
  return errors;
};







