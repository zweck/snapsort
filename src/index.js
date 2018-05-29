import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers';

import FileExplorer from './containers/FileExplorer'
import ImageView from './containers/ImageView'

const styles = {
  viewContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  sideBar: {
    flex: '1'
  },
  mainContent: {
    flex: '3'
  }
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div style={styles.viewContainer}>
        <div style={styles.sideBar}>
          <Route path="" component={FileExplorer} />
        </div>
        <div style={styles.mainContent}>
          <Route path="" component={ImageView} />
        </div>
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);
