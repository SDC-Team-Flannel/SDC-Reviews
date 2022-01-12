import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown } from '@fortawesome/free-solid-svg-icons';

const ImageGallery = (props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [galleryLength, setGalleryLength] = useState(props.currentStyle.photos.length);

  useEffect(() => {
    setGalleryLength(props.currentStyle.photos.length);
  }, [props.currentStyle.photos]);

  const next = () => {
    if (currentImage < galleryLength - 1) {
      setCurrentImage((prevState) => prevState + 1);
    }
  };

  const previous = () => {
    if (currentImage > 0) {
      setCurrentImage((prevState) => prevState - 1);
    }
  };

  return (
    <Container>
      <Carousel_Container>
        {currentImage > 0 ? (
          <UpArrow onClick={previous}>
            &#94;
          </UpArrow>
        ) : (
          <HiddenArrow>
            <FontAwesomeIcon icon={faArrowCircleUp} />
          </HiddenArrow>
        )}
        <Carousel_Wrapper>
          <Carousel_Content style={{ transform: `translateY(-${currentImage * 10}vh)` }}>
            {props.currentStyle.photos.map((photo, key) => (
              <Thumbnail_Container key={key}>
                <Thumbnail
                  src={
                    photo.thumbnail_url ||
                    'https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
                  }
                  onClick={() => {
                    props.changePhoto(photo);
                    setCurrentImage(key);
                  }}
                />
              </Thumbnail_Container>
            ))}
          </Carousel_Content>
        </Carousel_Wrapper>
        {currentImage < galleryLength - 1 && (
          <DownArrow onClick={next}>
            &#709;
          </DownArrow>
        )}
      </Carousel_Container>
    </Container>
  );
};

export default ImageGallery;

const HiddenArrow = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  visibility: hidden;
  cursor: default;
`;

const UpArrow = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  font-weight: 600
  cursor: default;
`;

const DownArrow = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  position: absolute;
  transform: translateY(149px);
  font-size: 30px;
  cursor: default;
`;

const Container = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  overflow: hidden;
`;

const Carousel_Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
`;

const Carousel_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Carousel_Content = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 250ms linear;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Thumbnail_Container = styled.div`
  display: flex;
  position: relative;

  margin: 6px 12px;
  height: 5vh;
  width: 5vh;
  position: relative;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
  object-fit: cover;
  position: absolute;
  box-shadow: 0px 0px 3px #666;
`;
