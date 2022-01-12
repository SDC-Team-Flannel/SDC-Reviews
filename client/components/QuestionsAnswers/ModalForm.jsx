import React, { useState } from 'react';
import styled from 'styled-components';

import AddPhotos from './AddPhotos.jsx';
import { Button, Input } from '../Shared/Form';


export const AnswerModal = ({ product_name, handleClose, question, submitAnswerForm, answerBody, nickName, email, upload, photos, removePhoto }) => {

  return (
    <Container>
      <BodyContainer>
        <Label>
          <h2>Submit your answer <CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton></h2>
        </Label>
        <Label>{product_name} : {question.question_body}</Label>
        <br/>
        <Label>
          <div>Your Answer Below*</div>
          <TextArea rows="10" cols="100" maxLength="1000" onChange={answerBody} required>
          </TextArea>
        </Label>
        <Label>
          <div>What is your nickname*</div>
          <Input placeholder="Example: jack543!" type = "text" maxLength="60" onChange={nickName} required></Input>
          <div>For privacy reasons, do not use your full name or email address.</div>
        </Label>
        <Label>
          <div>Your email*</div>
          <Input placeholder="Example: jack@email.com" maxLength="60" onChange={email} required></Input>
          <div>For authentication reasons, you will not be emailed.</div>
        </Label>
        <Label>
          <AddPhotos
            upload={upload}
            photos={photos}
            removePhoto={removePhoto}
          />
        </Label>
        <br/>
        <br/>
        <SubmitButton onClick={submitAnswerForm}>Submit your answer</SubmitButton>
      </BodyContainer>
    </Container>
  );
};

export const QuestionModal = ({ product_name, handleClose, submitQuestionForm, questionBody, nickName, email }) => {
  return (
    <Container>
      <BodyContainer>
        <Label>
          <h2>Ask your question about the {product_name}<CloseButton type="button" onClick={handleClose}>
            Close
          </CloseButton></h2>
        </Label>
        <Label>
          <div>Your Questiton*</div>
          <TextArea rows="10" cols="100" maxLength="1000" onChange={questionBody} required></TextArea>
        </Label>
        <Label>
          <div>What is your nickname*</div>
          <Input placeholder="Example: jack11!" type = "text" maxLength="60" onChange={nickName} required></Input>
          <div>For privacy reasons, do not use your full name or email address.</div>
        </Label>
        <Label>
          <div>Your email*</div>
          <Input placeholder="Example: jack@email.com" maxLength="60" onChange={email} required></Input>
          <div>For authentication reasons, you will not be emailed.</div>
        </Label>
        <br/>
        <SubmitButton onClick={submitQuestionForm}>Submit your question</SubmitButton>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  z-index: 200;
  position:fixed;
  background: ${(props) => props.theme.bgLight};
  width: 80%;
  height: 80%;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80%;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const Label = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
  padding-bottom: 15px;
  padding-top: 15px;
`;

const Photos = styled.input`
  margin-bottom: 30px;
`;

const CloseButton = styled.span`
  margin-right: 20px;
  float: right;
  cursor: pointer;
`;

const BodyContainer = styled.div`
  margin-left: 20px;
`;

const TextArea = styled.textarea`
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  background-color: ${(props) => props.theme.bgLight};
  color: ${(props) => props.theme.textLight};
  padding: 10px;
  border: 0px;
  margin: 0px 10px 10px 0px;
  outline: 1px solid ${(props) => props.theme.textLight};
`;

const SubmitButton = styled.button`

  background-color: ${(props) => props.theme.button};
  color: ${(props) => props.theme.textInv};
  border: 0px;

  :hover {
    opacity: 0.8;
    background-color: ${(props) => props.theme.button}
  }
  outline: 1px solid ${(props) => props.theme.textLight};
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px;
  margin-bottom: 20px;
`;

