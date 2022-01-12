import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import api from '../../api';
import { allTrue } from '../../lib/ratingFunctions';

import Ratings from './Ratings';
import Characteristics from './Characteristics';
import ReviewList from './ReviewList';
import AddReview from './AddReview';

const RatingsReviews = ({ data, product, fetch }) => {
  const [filters, setFilters] = useState({ ...allTrue });
  const [showModal, setShowModal] = useState(false);

  return (
    <Container id='RatingsReviews'>
      {showModal === true && (
        <AddReview
          product={product}
          meta={data}
          onClose={() => setShowModal(false)}
          onSubmit={() => {
            setShowModal(false);
            fetch({
              product_id: product.id,
              page: 1,
              count: 100,
              sort: 'newest',
            });
          }}
        />
      )}
      <h3>Ratings and Reviews</h3>
      <MainContainer>
        <LeftContainer>
          <Ratings data={data} updateFilter={setFilters} filters={filters} />
          <Characteristics data={data} />
        </LeftContainer>
        <RightContainer>
          <ReviewList
            data={data}
            filters={filters}
            fetch={fetch}
            addReview={() => setShowModal(true)}
            product={product}
          />
        </RightContainer>
      </MainContainer>
    </Container>
  );
};

const Container = styled.div`
  color: ${(props) => props.theme.textLight};

  width: 96%;
  padding: 0% 2%;

  h3 {
    font-size: 13px;
    text-transform: uppercase;
    font-weight: normal;
  }
`;

const MainContainer = styled.div`
  display: flex;
  @media (max-width: 880px) {
  }

  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;

  @media (max-width: 880px) {
    width: 45%;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;

const RightContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;

  @media (max-width: 880px) {
    width: 55%;
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;

export default RatingsReviews;
