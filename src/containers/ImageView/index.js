import React, { Component } from 'react';
import path from 'path'

import { Caman } from 'caman'

import { connect } from 'react-redux';
import * as actions from '../../actions';

const APP_FOLDER = process.cwd()

class ImageView extends Component {
  processImage (imagePath) {
    const selectImage = this.props.selectImage;
    Caman(imagePath, function () {
      this.exposure(-10);
      this.brightness(10);
      this.contrast(20);
      this.render(function () {
        const tempImageName = imagePath.replace(new RegExp('/', 'g'), '_slash_');
        const tempImagePath = `${APP_FOLDER}/tmp/${tempImageName}`;
        const img = this.toBase64('png');
        selectImage(img);
      });
    });
  }

  render () {
    const { imagePath } = this.props;
    return !!( imagePath ) && (
      <img
        onClick={e => this.processImage(imagePath)}
        style={{width: '100%', objectFitL: 'cover'}}
        src={imagePath}
      />
    )
  }
};

const mapStateToProps = ({ levelData }) => {
  return {
    imagePath: levelData.selectedImage
  }
};

export default connect(mapStateToProps, actions)(ImageView);
