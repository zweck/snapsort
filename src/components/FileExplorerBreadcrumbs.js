import React, { Component } from 'react';
import _ from 'lodash';

class FileExplorerBreadcrumbs extends Component {
	constructor(props) {
		super(props);
	}

	shapeBreadcrumbs(currentPath) {
		return _.map(_.split(currentPath, '/'), (folder)=> {
			return {
				path: folder && currentPath.substr(0, currentPath.indexOf(folder) + folder.length + 1),
				title: folder
			};
		});
	}

	renderBreadcrumbs() {
		const {	currentPath, updateCurrentPath } = this.props;
		const shapedBreadcrumbs = this.shapeBreadcrumbs(currentPath);
			return _.map(shapedBreadcrumbs, (crumb) => {
				return crumb.title && <span className="waves-effect waves-light btn purple darken-1 breadcrumb-item" onClick={() => {updateCurrentPath(crumb.path)}} key={crumb.title}>
					{`${crumb.title}/`}</span>
			});
	}

	render() {
		return (
			<div>
				{this.renderBreadcrumbs()}
			</div>
		);
	}
}
export default FileExplorerBreadcrumbs;
