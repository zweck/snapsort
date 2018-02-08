import React, { Component } from 'react';
import { ROOT_FOLDER } from '../constants';

class BackButton extends Component {
	constructor(props) {
		super(props);
		this.levelBack = this.levelBack.bind(this);
	}

	levelBack() {
		const { currentPath, updateCurrentPath } = this.props;
		const newPath = currentPath.match(/^(.+\/)[^\/]+\/$/)[1];
		console.log(newPath);
		updateCurrentPath(newPath);
	}

	render() {
		const { currentPath } = this.props;

		return (
			<div className="back-btn">
				<a className={`waves-effect waves-light btn ${currentPath === ROOT_FOLDER && 'disabled'}`} onClick={this.levelBack}>
					<i className="material-icons left">arrow_back</i>
					Back</a>
			</div>
		);
	}
}
export default BackButton;
