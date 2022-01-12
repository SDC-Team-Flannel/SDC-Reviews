import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ls from 'local-storage';

import api from '../../api.js';

export const MarkHelpfulReport = ({ review, product }) => {
  let markedReviews = ls.get('markedReviews') || [];
  let reported = ls.get('reported') || [];

  let [alreadyMarked, setAlreadyMarked] = useState(
    markedReviews.includes(review.review_id)
  );
  let [alreadyReported, setAlreadyReported] = useState(
    reported.includes(review.review_id)
  );

  useEffect(() => {
    setAlreadyMarked(markedReviews.includes(review.review_id));
    setAlreadyReported(reported.includes(review.review_id));
  }, [review.review_id]);

  let markAsHelpful = () => {
    ls.set('markedReviews', [...markedReviews, review.review_id]);
    api.markReviewAsHelpful({ review_id: review.review_id });
    setAlreadyMarked(true);
  };

  let report = () => {
    ls.set('reported', [...reported, review.review_id]);
    api.reportReview({ review_id: review.review_id });
    setAlreadyReported(true);
  };

  return (
    <Text>
      {alreadyMarked === true ? (
        <>✓ Helpful ({review.helpfulness + 1})</>
      ) : (
        <>
          Helpful? ({review.helpfulness}) <a onClick={markAsHelpful}>Yes</a>
        </>
      )}
      {' | '}
      {alreadyReported === true ? (
        <>✓ Reported</>
      ) : (
        <a onClick={report}>Report Review</a>
      )}
    </Text>
  );
};

const Text = styled.div`
  margin: 0px 0px 10px 0px;
  padding: 0px;
  font-size: 0.7em;
  color: ${(props) => props.theme.textLight};
  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
