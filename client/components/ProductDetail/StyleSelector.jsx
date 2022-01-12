import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

const StyleSelector = (props) => {
  const [styleIndex, setStyleIndex] = useState(0);
  const [length, setLength] = useState(props.productStyles.length);

  useEffect(() => {
    setLength(props.productStyles.length);
  }, [props.productStyles]);

  const next = () => {
    if (styleIndex < length - 1) {
      setStyleIndex((prevState) => prevState + 1);
    }
  };

  const previous = () => {
    if (styleIndex > 0) {
      setStyleIndex((prevState) => prevState - 1);
    }
  };

  return (
    <Container>
      <CarouselContainer>
        {styleIndex > 0 ? (
          <LeftButton onClick={previous}>
            &#171;
          </LeftButton>
        ) : (
          <HiddenButton>
            <FontAwesomeIcon icon={faArrowCircleLeft} />
          </HiddenButton>
        )}
        <CarouselWrapper>
          <CarouselContent style={{ transform: `translateX(-${(styleIndex * 100) / 4}%)` }}>
            {props.productStyles.map((style, key) => (
              <ImageContainer key={key}>
                <Thumbnail
                  src={
                    style.photos[0].thumbnail_url ||
                    'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
                  }
                  onClick={() => {
                    props.changeStyle(style);
                  }}
                />
              </ImageContainer>
            ))}
          </CarouselContent>
        </CarouselWrapper>
        <RightButton onClick={next}>
          &#187;
        </RightButton>
      </CarouselContainer>
    </Container>
  );
};

export default StyleSelector;

const Container = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  width: 200%;
  height: 100%;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: 100%;
  padding: 5px;
`;

const Checkmark = styled.img`
  max-height: 10px;
  max-width: 10px;
`;

const LeftButton = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  width: 12px;
  height: 12px;
  left: 0px;
  transform: translateY(10px);
  font-size: larger;
  cursor: default;
`;

const HiddenButton = styled.div`
  visibility: hidden;
  display: flex;
  flex-direction: row;
  width: 12px;
  height: 12px;
  left: 0px;
  transform: translateY(10px);
  font-size: larger;
`;

const RightButton = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 1;
  width: 12px;
  height: 12px;
  transform: translateY(10px);
  font-size: larger;
  cursor: default;
`;

const ImageContainer = styled.div`
  margin-right: 10px;
  height: 40px;
  width: 40px;
  position: relative;
`;

const Thumbnail = styled.img`
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  position: absolute;
  box-shadow: 0px 0px 3px #666;
`;
