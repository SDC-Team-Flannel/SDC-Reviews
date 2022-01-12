import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardItem from './CardItem.jsx';

var OutfitCarousel = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(props.outfitData.length);

  useEffect(() => {
    setLength(props.outfitData.length);
  }, [props.outfitData]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <CarouselComponent>
      <CarouselContainer>
        {currentIndex > 0 && <LeftButton onClick={prev}>&#171;</LeftButton>}
        <CarouselWrapper>
          <CarouselContent style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}>
            <CardItem firstCard={true} add={props.addOutfit} />
            {props.outfitData.map((item, i) => {
              return (
                <CardItem
                  key={i}
                  item={item}
                  inOutfit={true}
                  rating={item.rating.ratings}
                  remove={props.removeItem}
                />
              );
            })}
          </CarouselContent>
        </CarouselWrapper>
        {currentIndex < length - 1 && <RightButton onClick={next}>&#187;</RightButton>}
      </CarouselContainer>
    </CarouselComponent>
  );
};

const CarouselComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  color: ${(props) => props.theme.textLight};
`;

const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  position: relative;
  padding: 5px;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 5px;
`;

const CarouselContent = styled.div`
  display: flex;
  transition: all 250ms linear;
  width: 100%;
  padding: 5px;
`;

const LeftButton = styled.div`
  cursor: pointer;
  font-size: 50px;
  z-index: 1;
  top: 50%;
  left: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightButton = styled.div`
  cursor: pointer;
  font-size: 50px;
  z-index: 1;
  top: 50%;
  right: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default OutfitCarousel;
