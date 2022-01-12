import React, { useState } from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery.jsx';

const ModalImage = (props) => {
  const [showing, setShowing] = useState(false);

  const magnify = (imageID, zoom) => {
    var img = document.getElementById(imageID);

    /* Create magnifier glass: */
    var glass = document.createElement('DIV');
    glass.setAttribute('class', 'img-magnifier-glass');

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = `url('${img.src}')`;
    glass.style.backgroundRepeat = 'no-repeat';
    glass.style.backgroundSize = (img.width * zoom) + 'px ' + (img.height * zoom) + 'px';
    glass.style.position = 'absolute';
    glass.style.border = '3px solid #000';
    glass.style.cursor = 'none';
    glass.style.width = '200px';
    glass.style.height = '200px';

    var bw = 3;
    var w = glass.offsetWidth / 2;
    var h = glass.offsetWidth / 2;

    var getCursorPos = (e) => {
      e = e || window.event;

      /* get the x and y positions of the image: */
      var a = img.getBoundingClientRect();

      /* calculate the cursor's x and y coordinates, relative to the image: */
      var x = e.pageX - a.left;
      var y = e.pageY - a.top;

      /* consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    };

    var moveMagnifier = (e) => {
      /* prevent any other actions that may occur when moving over the image */
      e.preventDefault();

      /* get the cursor's x and y positions: */
      var pos = getCursorPos(e);
      var x = pos.x;
      var y = pos.y;

      /* prevent the magnifier glass from being positioned outside the image: */
      if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
      if (x < w / zoom) { x = w / zoom; }
      if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
      if (y < h / zoom) { y = h / zoom; }

      /* set the position of the magnifier glass: */
      glass.style.left = ( x - w ) + 'px';
      glass.style.top = ( y - h ) + 'px';

      /* display what the magnifier glass "sees": */
      glass.style.backgroundPosition = '-' + ((x * zoom) - w + bw) + 'px -' + ((y * zoom) - h + bw) + 'px';
    };

    /* execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener('mousemove', moveMagnifier);
    img.addEventListener('mousemove', moveMagnifier);

    /* and also for touch screens: */

    glass.addEventListener('touchmove', moveMagnifier);
    img.addEventListener('touchmove', moveMagnifier);
  };

  return (
    <Container>
      <ImageGalleryContainer>
        <ImageGallery currentStyle={props.currentStyle} changePhoto={props.changePhoto} />
      </ImageGalleryContainer>
      <ImageContainer>
        {showing && (
          magnify('myimage', 2.5)
        )}
        <img src={props.currentPhoto.url} id="myimage" onClick={() => { setShowing(true); }}/>
      </ImageContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  max-height: 100vh;
  img {
    max-width: 88vw;
    max-height: 88vh;
  }
  cursor: crosshair;
`;

const ImageContainer = styled.div`
  position: relative;
`;

const ImageGalleryContainer = styled.div`
  display: inline-block;
  width: 33px;
  height: 440px;
  margin-right: 30px;
`;

export default ModalImage;