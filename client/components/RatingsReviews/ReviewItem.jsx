import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../Shared/Modal';
import { Stars } from '../Shared/Stars';
import { Highlighter } from '../Shared/Highlighter';
import { MarkHelpfulReport } from './MarkHelpfulReport';

//TODO - add some better date parsing logic

const ReviewItem = ({ review, product, keyword }) => {
  const [showing, setShowing] = useState(false);
  const [url, setUrl] = useState();
  const [dimensions, setDimensions] = useState([50, 70]);

  const displayDate = new Date(review.date).toLocaleString('en-us', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <Container>
      {showing === true && (
        <Modal width={dimensions[0]} height={dimensions[1]} onClose={() => setShowing(false)}>
          <ModalImage>
            <img src={url} />
          </ModalImage>
        </Modal>
      )}
      <Header>
        <Text>
          <Stars number={review.rating} size={16} />
        </Text>
        <Text>
          {review.reviewer_name}, {displayDate}
        </Text>
      </Header>
      <Body>
        <Text>
          <h1>
            <Highlighter string={review.summary} query={keyword} />
          </h1>
        </Text>
        <Text>
          <Highlighter string={review.body} query={keyword} />
        </Text>
        {review.recommend === true && (
          <Text>
            <b>✓</b> I recommend this product
          </Text>
        )}
        {review.response && (
          <Response>
            <b>Response:</b>
            <br />
            {review.response}
          </Response>
        )}
        <ImageContainer>
          {review.photos.map((p, i) => (
            <img
              key={i}
              src={p.url}
              onClick={(e) => {
                setUrl(p.url);
                setShowing(true);

                let x =
                  (80 * window.innerHeight * e.target.width) /
                  (window.innerWidth * e.target.height);
                console.log(x);
                setDimensions([x, 80]);
              }}
            />
          ))}
        </ImageContainer>
        <MarkHelpfulReport review={review} product={product} />
      </Body>
    </Container>
  );
};

const HighlightCustomComponent = ({ children, highlightIndex }) => (
  <strong className='highlighted'>{children}</strong>
);

const HighlightSpan = styled.span`
  background-color: yellow;
`;

const Container = styled.div`
  margin: 10px 0px 20px 0px;
  padding: 0px 10px 10px 10px;
  border-bottom: 1px solid ${(props) => props.theme.bgDark};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Text = styled.div`
  margin: 0px 0px 10px 0px;
  padding: 0px;
  font-size: 0.7em;
  color: ${(props) => props.theme.textLight};
  h1 {
    font-size: 1.1em;
    font-weight: bold;
  }
  .highlighted {
    background-color: ${(props) => props.theme.highlight};
  }
`;

const Response = styled.div`
  background-color: ${(props) => props.theme.bgDark};
  margin: 10px 0px 5px 0px;
  padding: 10px;
  font-size: 0.7em;
`;

const Body = styled.div`
  margin-top: 8px;
  line-height: 1em;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  img {
    height: 50px;
    margin-right: 10px;
  }
  img:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const ModalImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`;

export default ReviewItem;
