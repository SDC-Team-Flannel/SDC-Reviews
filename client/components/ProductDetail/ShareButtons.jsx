import React, { Component } from 'react';
import styled from 'styled-components';

const ShareButtons = () => {
  return (
    <Container>
      <Facebook className="facebook-share-button" href="https://facebook.com">
        <FacebookButton src="https://marvel-b1-cdn.bc0a.com/f00000000181213/www.valpo.edu/international/files/2018/09/social-facebook-button-blue-icon-400x400.png"/>
      </Facebook>
      <Twitter className="twitter-share-button" href="https://twitter.com/intent/tweet">
        <TwitterButton src="https://img1.pnghut.com/0/9/0/de8Q9z9Yg3/text-blue-azure-button-symbol.jpg"/>
      </Twitter>
      <Pinterest className="pinterest-share-button" href="https://www.pinterest.com/">
        <PinterestButton src="https://www.ignitesocialmedia.com/wp-content/uploads/2012/08/pinterest-logo.png"/>
      </Pinterest>
    </Container>
  );
};

export default ShareButtons;

const Container = styled.div`
  cursor: pointer;
`;

const Facebook = styled.a`

`;

const FacebookButton = styled.img`
  max-height: 20px;
  max-width: 20px;
`;

const Twitter = styled.a`

`;

const TwitterButton = styled.img`
  max-height: 20px;
  max-width: 20px;
`;

const Pinterest = styled.a`

`;

const PinterestButton = styled.img`
  max-heigth: 20px;
  max-width: 20px;
`;