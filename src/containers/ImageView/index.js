import React, { Component } from 'react';
import path from 'path'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faMagic from '@fortawesome/fontawesome-free-solid/faMagic'

import { Caman } from 'caman'

import { connect } from 'react-redux';
import * as actions from '../../actions';

const APP_FOLDER = process.cwd()

class ImageView extends Component {
  processImage (imagePath) {
    const selectImage = this.props.selectImage;
    Caman(imagePath, function () {
      this.resize({
        width: 1000
      });
      this.gamma(1.4);
      this.brightness(10)
      this.contrast(8)
      this.render(function () {
        const img = this.toBase64('png');
        selectImage(img);
      });
    });
  }

  render () {
    const { imagePath } = this.props;
    return !!( imagePath ) && (
      <div>
				<button
          onClick={e => this.processImage(imagePath)}
          className="waves-effect waves-light btn">
          <FontAwesomeIcon icon={faMagic} />  Magic
        </button>
        <img
          style={{width: '100%', objectFitL: 'cover'}}
          src={imagePath}
        />
      </div>
    )
  }
};

const mapStateToProps = ({ levelData }) => {
  return {
    imagePath: levelData.selectedImage
  }
};

export default connect(mapStateToProps, actions)(ImageView);
