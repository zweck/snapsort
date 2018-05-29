import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { ROOT_FOLDER } from '../constants';

import FileExplorerTree from '../components/FileExplorerTree';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import FileExplorerBreadcrumbs from '../components/FileExplorerBreadcrumbs';

class FileExplorer extends Component {
	constructor(props) {
		super(props);
		this.updateCurrentPath = this.updateCurrentPath.bind(this);

		this.state = {
			currentPath: ROOT_FOLDER
		};
	}

	componentDidMount() {
		this.props.levelDataListenerOn();
		this.props.pasteDoneListenerOn();
		this.props.levelDataRequest(this.state.currentPath);
	}

	updateCurrentPath(newPath) {
		this.setState({
			currentPath: newPath
		});
		this.props.levelDataRequest(newPath);
	}

	clickPasteButtonHandler() {
		const { toCopy, toMove } = this.props.copyMovePaths;
		this.props.pasteRequest(toCopy || toMove, this.state.currentPath,  toCopy ? 'copy' : 'move');
	}

	render() {
    const {
      copyRequest,
      moveRequest,
      pasteRequest,
      saveDestPath,
      copyMovePaths,
      levelData
    } = this.props
		const {toCopy, toMove} = this.props.copyMovePaths;
		return (
			<div className="file-explorer">
				<div className="file-explorer__navigation">
					<div>
						<BackButton
              updateCurrentPath={this.updateCurrentPath}
							currentPath={this.state.currentPath} />
						<FileExplorerBreadcrumbs
              currentPath={this.state.currentPath}
              updateCurrentPath={this.updateCurrentPath}/>
					</div>
					<div>
						{this.props.copyMovePaths.status === 'inprogress' ? <Spinner /> : ''}
						<button
              disabled={!toCopy && !toMove}
              onClick={this.clickPasteButtonHandler.bind(this)}
              className="waves-effect waves-light btn paste-btn">Paste</button>
					</div>
				</div>
				<FileExplorerTree
          selectImage={this.props.selectImage}
					currentPath={this.state.currentPath}
					updateCurrentPath={this.updateCurrentPath}
					copyRequest={copyRequest}
					moveRequest={moveRequest}
					pasteRequest={pasteRequest}
					saveDestPath={saveDestPath}
					copyMovePaths={copyMovePaths}
					treeData={levelData[this.state.currentPath]} />
			</div>

		);
	}
}

function mapStateToProps({levelData, copyMovePaths}) {
	return {
		levelData,
		copyMovePaths
	};
}

export default connect(mapStateToProps, actions)(FileExplorer);
