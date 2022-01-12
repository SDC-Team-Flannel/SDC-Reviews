import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal } from '../Shared/Modal.jsx';
import ModalImage from './ModalImage.jsx';

const ProductImage = ({ currentPhoto, currentStyle, changePhoto }) => {
  const [showing, setShowing] = useState(false);

  if (currentPhoto && currentPhoto.url) {
    return (
      <Container>
        <Image
          id='image'
          src={currentPhoto.url}
          onClick={() => {
            setShowing(true);
          }}
        />
        {showing && (
          <Modal height={100} width={100} onClose={() => setShowing(false)}>
            <ModalImage
              currentPhoto={currentPhoto}
              currentStyle={currentStyle}
              changePhoto={changePhoto}
            />
          </Modal>
        )}
      </Container>
    );
  } else {
    return (
      <Container>
        <Image
          id='image'
          src='https://res.cloudinary.com/dkit4ixkx/image/upload/v1641530491/dog_jxwvea.png'
        />
      </Container>
    );
  }
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  cursor: zoom-in;
`;

export default ProductImage;
