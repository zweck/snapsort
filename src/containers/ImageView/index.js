import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions';

const ImageView = ({ imagePath }) => (
  <img
  style={{width: '100%', objectFitL: 'cover'}}
    id='image-viewer'
    dataCaman="brightness(10) contrast(30) sepia(60) saturation(-30)"
    src={imagePath}
  />
);

const mapStateToProps = ({ levelData }) => {
  return {
    imagePath: levelData.selectedImage
  }
};

export default connect(mapStateToProps, actions)(ImageView);
