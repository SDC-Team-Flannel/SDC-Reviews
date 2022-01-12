import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// cloudinary.v2.uploader.upload(
//   'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
//   { public_id: 'olympic_flag' },
//   function (error, result) {
//     console.log(result);
//   }
// );

// .config({
//   cloud_name: 'dkit4ixkx',
//   api_key: '622458834833342',
//   api_secret: 'UxzpIj_U3Bi2_2ImHfoQmEiGbSI'
// });

import { characteristics } from '../../lib/characteristics';

export const RecommendForm = ({ formData, setFormData, errors, setErrors }) => (
  <div
    onChange={(e) => {
      setFormData({
        ...formData,
        recommend: e.target.value === 'true',
      });
      setErrors({
        ...errors,
        recommend: '',
      });
    }}
  >
    <input
      type='radio'
      value={true}
      name='recommended'
      defaultChecked={formData.recommend === true}
    />{' '}
    Yes
    <input
      type='radio'
      value={false}
      name='recommended'
      defaultChecked={formData.recommend === false}
    />{' '}
    No
  </div>
);

export const CharacteristicsForm = ({ meta, formData, setFormData, errors, setErrors }) => {
  let neededCharacteristics = Object.keys(meta.characteristics);

  let updateCharacteristic = (key, value) => {
    let temp = { ...formData.characteristics };
    temp[meta.characteristics[key].id] = value;
    setFormData({
      ...formData,
      characteristics: temp,
    });
    setErrors({
      ...errors,
      characteristics: '',
    });
  };

  return (
    <table>
      <tbody>
        {neededCharacteristics.map((c, i) => (
          <tr key={i}>
            <th>{c}</th>
            {characteristics[c].map((q, j) => {
              let className = '';
              let id = meta.characteristics[c].id;
              if (
                formData.characteristics &&
                formData.characteristics[id] &&
                formData.characteristics[id] === j + 1
              ) {
                className = 'selected';
              }
              return (
                <td key={j} className={className} onClick={() => updateCharacteristic(c, j + 1)}>
                  {q}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

/*example images
https://cdn.pixabay.com/photo/2020/12/01/10/04/dog-5793625__480.jpg
https://cdn.pixabay.com/photo/2021/12/09/20/58/christmas-cookies-6859116__340.jpg
*/

export const AddImages = ({ formData, setFormData }) => {
  let photos = formData.photos || [];

  const [uploading, setUploading] = useState(false);

  let getNewUrl = () => {
    let url = prompt('Enter Image URL');
    if (url) {
      setFormData({ ...formData, photos: [...photos, url] });
    }
  };

  let uploadImage = async (e) => {
    if (e.target.files[0]) {
      const data = new FormData();
      data.append('file', e.target.files[0]);
      data.append('upload_preset', 'ea2t0ulv');
      setUploading(true);
      let res = await axios.post('https://api.cloudinary.com/v1_1/dkit4ixkx/upload', data);
      let url = res.data.url;
      await setFormData({ ...formData, photos: [...photos, url] });
      setUploading(false);
    }
  };

  let removeImage = (i) => {
    let temp = formData.photos.filter((x, j) => j !== i);
    setFormData({ ...formData, photos: [...temp] });
  };

  return (
    <ImageContainer>
      {photos.map((url, i) => (
        <ImageRemove key={i} onClick={() => removeImage(i)}>
          <div>&#10008;</div>
          <img src={url} />
        </ImageRemove>
      ))}
      {photos.length < 5 && uploading === false && (
        <>
          <ImageLabel htmlFor='file'>+</ImageLabel>
          <ImageInput type='file' id='file' onChange={(e) => uploadImage(e)} />
        </>
      )}
      {uploading === true && (
        <Uploading>
          <img src='https://bit.ly/32HmbVM' />
        </Uploading>
      )}
    </ImageContainer>
  );
};

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const ImageRemove = styled.div`
  position: relative;
  padding: 0px;
  margin-right: 10px;
  img {
    height: 80px;
    margin: 0px;
    padding: 0px;
  }
  div {
    position: absolute;
    width: 100%;
    height: 80px;
    text-align: center;
    line-height: 80px;
    font-size: 40px;
    color: ${(props) => props.theme.error};
    opacity: 0;
    background-color: transparent;
  }
  div:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const Uploading = styled.div`
  width: 80px;
  height: 80px;
`;

const ImageButton = styled.input`
  width: 80px;
  height: 76px;
  border-radius: 4px;
  color: ${(props) => props.theme.bgDark};
  font-size: 30px;
  border: 2px dotted ${(props) => props.theme.bgDark};
  background-color: ${(props) => props.theme.bgLight};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.bg};
  }
`;

const ImageLabel = styled.label`
  display: block;
  width: 80px;
  line-height: 80px;
  height: 76px;
  border-radius: 4px;
  text-align: center;
  color: ${(props) => props.theme.bgDark};
  font-size: 30px;
  border: 2px dotted ${(props) => props.theme.bgDark};
  background-color: ${(props) => props.theme.bgLight};
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.bg};
  }
`;

const ImageInput = styled.input`
  opacity: 0;
  width: 1;
  height: 80px;
  z-index: 1;
`;
