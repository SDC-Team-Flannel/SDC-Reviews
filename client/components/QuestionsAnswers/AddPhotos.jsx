import React, { useState } from 'react';
import styled from 'styled-components';

const AddPhotos = ({ upload, photos, removePhoto }) => {
  return (
    <div>
      <div>Add Images</div>
      <div>
        <input type='file' onChange={(e) => upload(e)} />
      </div>
      <div>
        {photos.map((photo, i) => {
          return (
            <PhotosContainer key={i} onClick={(e) => removePhoto(e)}>
              <Photos>
                <img src={photo}></img>
              </Photos>
            </PhotosContainer>
          );
        })}
      </div>
    </div>
  );
};

const PhotosContainer = styled.div`
  display: inline;
  flex_direction: row;
`;

const Photos = styled.div`
  display: inline;

  img {
    width: 90px;
    height: 75px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
`;

export default AddPhotos;