
import React, { Component } from 'react';
import { remote } from 'electron';
import _ from 'lodash';

const { Menu, MenuItem } = remote;

class FileExplorerTree extends Component {
	constructor(props) {
		super(props);

		this.menu = null;
		this.clickedPath = null;
	}

	componentWillMount() {
		this.menu = new Menu();
		this.menu.append(new MenuItem({
				label: 'Copy',
				click: () => {
					this.props.copyRequest(this.clickedPath);
					this.menu.items[4].enabled = true;
				}})
		);
		this.menu.append(new MenuItem({type: 'separator'}));
		this.menu.append(new MenuItem({
			label: 'Move',
			click: () => {
				this.props.moveRequest(this.clickedPath);
				this.menu.items[4].enabled = true;
			}})
		);
		this.menu.append(new MenuItem({type: 'separator'}));
		this.menu.append(new MenuItem({
			label: 'Paste',
			enabled: _.some(this.props.copyMovePaths, _.isEmpty),
			click: () => {
				const { toCopy, toMove } = this.props.copyMovePaths;
				this.props.pasteRequest(toCopy || toMove, this.clickedPath,  toCopy ? 'copy' : 'move');
			}})
		);
	}

  isImage(file) {
    return file.mimeType && file.mimeType.indexOf('image') > -1
  }

	updateCurrentPath(folder) {
    const path = `${this.props.currentPath}${folder.title}`
		!folder.isFile && this.props.updateCurrentPath(`${path}/`);
    this.isImage(folder) && this.props.selectImage(path)
	}

	contextMenu(folderTitle) {
		this.clickedPath = `${this.props.currentPath}${folderTitle}/`;
		this.menu.popup(remote.getCurrentWindow());
	}

	renderFolders() {
		return _.map(this.props.treeData, folder => {
			return <a className="collection-item root-item"
								onContextMenu={() => {
									this.contextMenu(folder.title)
								}}
								onClick={() => {this.updateCurrentPath(folder)}}
								key={folder.title}>
				<i className="material-icons icon">{folder.isFile ? 'insert_drive_file' : 'folder'}</i>
				{folder.title}</a>
		});
	}

	renderEmptyFolder() {
		return <h2 className="center-align">Folder is empty</h2>;
	}

	renderExplorer() {
		if (this.props.treeData && this.props.treeData.length) {
			return <div className="collection">{this.renderFolders()}</div>
		}

		return <div>{this.renderEmptyFolder()}</div>;
	}


	render() {
		return (
			<div>
				{this.renderExplorer()}
			</div>
		);
	}
}
export default FileExplorerTree;
