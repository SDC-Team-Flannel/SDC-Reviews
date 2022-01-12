import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReviewItem from './ReviewItem';
import { sortReviews, keywordFilter } from '../../lib/reviewFunctions';
import { Button } from '../Shared/Form';

const ReviewList = ({ data, filters, addReview, product }) => {
  let display = data.reviews.filter((r) => filters[r.rating]);

  const [showing, setShowing] = useState(2);
  const [sort, setSort] = useState('newest');
  const [keyword, setKeyword] = useState('');
  const [infinite, setInfinite] = useState(false);

  const onScroll = (e) => {
    if (infinite && window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (showing < display.length) {
        setShowing(showing + 2);
      }
    }
  };

  //Update the state if the user switches to a different product
  useEffect(() => {
    setShowing(2);
    setInfinite(false);
  }, [product.id]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  });

  //sort based upon the default sort
  display = sortReviews(display, sort);

  //if the user searches for a keyword then dispaly
  if (keyword.length > 3) {
    display = keywordFilter(display, keyword);
  }

  return (
    <Container>
      <Header>
        Showing {Math.min(display.length, showing)} of {display.length} reviews | sorted by
        <Select onChange={(e) => setSort(e.target.value)}>
          <option value='newest'>newest</option>
          <option value='oldest'>oldest</option>
          <option value='ratingHigh'>highest rating</option>
          <option value='ratingLow'>lowest rating</option>
          <option value='helpful'>most helpful</option>
          <option value='relevant'>most relevant</option>
        </Select>
        <Input
          placeholder='keyword search'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Header>

      {display.map(
        (r, i) =>
          i < showing && <ReviewItem review={r} key={i} product={product} keyword={keyword} />
      )}
      {showing < display.length && infinite === false && (
        <>
          <Button
            onClick={() => {
              setInfinite(true);
              setShowing(showing + 2);
            }}
          >
            Show More
          </Button>
        </>
      )}
      <Button onClick={addReview} style={{ marginBottom: '100px' }}>
        Add a Review &nbsp;<b>+</b>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Header = styled.div`
  padding: 0px 20px 20px 10px;
`;

const Select = styled.select`
  color: ${(props) => props.theme.textLight};
  border: 0px;
  background-color: transparent;
  font-size: 1em;
  margin-left: 5px;
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
`;

const Input = styled.input`
  color: ${(props) => props.theme.textLight};
  border: 0px;
  background-color: transparent;
  font-size: 1em;
  margin-left: 5px;
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
  outline: 0px;
`;

export default ReviewList;
