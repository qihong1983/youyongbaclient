import React from 'react';
import {
	Router,
	Route
} from 'react-router';

import App from './App';
import Website from './pages/Website/Website';
import BackWebSite from './pages/Website/BackWebSite';

import BlackPage from './pages/BlackPage/BlackPage';

const Routes = (props) => (
	<Router {...props}>
		<Route path="/" component={App} />
		<Route path="website" component={Website} />
		<Route path="backwebsite" component={BackWebSite} />
		<Route path="blackpage" component={BlackPage} />
	</Router>
);

export default Routes;