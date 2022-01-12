import React from 'react';
import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import api from '../../api.js';
import QuestionList from './QuestionList.jsx';
import SearchBar from './SearchBar.jsx';

class QuestionsAnswers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      searchQuestions: [],
      clicked: false,
    };

    this.searchInput = this.searchInput.bind(this);
  }

  searchInput(e) {
    this.setState({
      searchText: e.target.value,
      searchQuestions: this.props.data.results.filter(
        (question) => question.question_body.toLowerCase().indexOf(e.target.value) !== -1
      ),
    });
  }

  render() {
    const { searchText, searchQuestions, clicked } = this.state;

    return (
      <Container>
        <h3>Questions & Answers</h3>
        <SearchBar searchInput={this.searchInput} />
        <div>
          <QuestionList
            product_id={this.props.data.product_id}
            product_name={this.props.product.name}
            questions={this.props.data.results}
            showMoreA={() => this.setState({ clicked: true })}
            showLessA={() => this.setState({ clicked: false })}
            searchText={searchText}
            searchQuestions={searchQuestions}
            clicked={clicked}
            fetchQuestionData={this.props.fetchQuestionData}
          />
        </div>
      </Container>
    );
  }
}

const Container = styled.div`
  color: ${(props) => props.theme.textLight};
  width: 96%;
  padding: 0% 2%;

  h3 {
    text-transform: uppercase;
    font-weight: normal;
    font-size: 13;
    margin: 15px 0px;
  }
`;

export default QuestionsAnswers;
