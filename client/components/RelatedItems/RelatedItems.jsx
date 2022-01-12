import React, { useState } from 'react';
import { COLORS } from '../../settings/colors';
import styled from 'styled-components';
import ls from 'local-storage';
import RelatedCarousel from './RelatedCarousel.jsx';
import OutfitCarousel from './OutfitCarousel.jsx';
import CompareModal from './CompareModal.jsx';
import { Modal } from '../Shared/Modal.jsx';

var RelatedItems = (props) => {
  var outfit = ls.get('myoutfit') || [];
  const [outfitData, setOutfit] = useState(outfit);
  const [showing, setShowing] = useState(false);
  const [related, setRelated] = useState(null);

  const add = () => {
    let product = props.product;
    product.rating = props.rating;
    let id = product.id;
    if (outfit.length === 0) {
      ls.set('myoutfit', [...outfit, product]);
    } else {
      let ids = outfit.reduce((items, current) => items.concat(current.id), []);
      if (ids.indexOf(id) === -1) {
        ls.set('myoutfit', [...outfit, product]);
      }
    }
    let update = ls.get('myoutfit') || [];
    setOutfit(update);
  };

  const remove = (removeId) => {
    ls.set(
      'myoutfit',
      outfit.filter((item) => item.id !== removeId)
    );
    let update = ls.get('myoutfit') || [];
    setOutfit(update);
  };

  const updateRelated = (relatedObj) => {
    setRelated(relatedObj);
    setShowing(true);
  };

  //Dedupe the to show every product id only once
  //dedupe to NOT show the main product in related
  let ids = props.related.related.map((x) => x.id);
  let displayRelated = [];
  props.related.related.forEach((x, i) => {
    if (ids.indexOf(x.id) === i && x.id !== props.product.id) {
      displayRelated.push(x);
    }
  });

  return (
    <Container>
      {showing === true && (
        <Modal onClose={() => setShowing(false)} width={50} height={40}>
          <CompareModal related={related} current={props.product} />
        </Modal>
      )}
      <h3>Related Products</h3>
      <RelatedCarousel
        relatedItems={displayRelated}
        currentProduct={props.product}
        relatedRating={props.related.ratings}
        update={props.updateProduct}
        updateModal={updateRelated}
      />
      <h3>Your Outfit</h3>
      <OutfitCarousel
        outfitData={outfit}
        removeItem={remove}
        addOutfit={add}
        currentProduct={props.product}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.textLight};

  margin-top: 25px;
  width: 96%;
  padding: 0% 2%;

  h3 {
    text-transform: uppercase;
    font-weight: normal;
    font-size: 13px;
    margin: 15px 0px;
  }
`;

export default RelatedItems;
