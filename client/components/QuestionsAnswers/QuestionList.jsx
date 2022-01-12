import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AnswersList from './AnswersList.jsx';
import AddAnswer from './AddAnswerModal.jsx';
import AddQuestion from './AddQuestion.jsx';
import { MarkQuestionHelpfulAndReported } from './MarkHelpfulAndReported.jsx';
import { Button } from '../Shared/Form';
import { sortedQuestion, QuestionBody } from './lib/dataFunctions.jsx';

const QuestionList = ({
  searchText,
  questions,
  product_name,
  product_id,
  showMoreA,
  searchQuestions,
  clicked,
  showLessA,
  fetchQuestionData,
}) => {
  const [show, setShow] = useState(2);

  let questionsToShow = questions.sort(sortedQuestion).slice(0, show);

  useEffect(() => {
    setShow(2);
  }, [product_id]);

  if (searchText.length >= 3) {
    questionsToShow = searchQuestions.sort(sortedQuestion).slice(0, show);
  }

  return (
    <Container>
      <ScrollDiv>
        {questionsToShow
          .map((question, i) => {
            const answers = Object.values(question.answers);
            return (
              <ListContainer key={i}>
                <QuestionText>
                  <span>Q:&nbsp;&nbsp;{question.question_body}</span>
                  <AddAnswer
                    product_name={product_name}
                    question={question}
                    product_id={product_id}
                    fetchQuestionData={fetchQuestionData}
                  />
                  <MarkQuestionHelpfulAndReported question={question} />
                </QuestionText>
                <AnswersList
                  answers={answers}
                  showMoreA={showMoreA}
                  clicked={clicked}
                  showLessA={showLessA}
                />
              </ListContainer>
            );
          })}
      </ScrollDiv>
      <ButtonContainer>
        {questions.length > show && (
          <Button onClick={() => setShow(questions.length)}>SEE MORE QUESTIONS</Button>
        )}
        {questions.length === show && (
          <Button onClick={() => setShow(2)}>COLLAPSE QUESTIONS</Button>
        )}
        <AddQuestion
          product_name={product_name}
          product_id={product_id}
          fetchQuestionData={fetchQuestionData}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.textLight};
  font-size: 0.8em;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 15px;
`;

const ScrollDiv = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 600px;
`;

const QuestionText = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 15px;
`;

const ListContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
`;

export default QuestionList;
