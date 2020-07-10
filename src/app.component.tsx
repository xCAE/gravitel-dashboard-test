import * as React from 'react';
import {FunctionComponent} from 'react';
import {useQuery} from 'react-apollo';
import {Redirect, Route, Switch, useLocation} from 'react-router-dom';
import Login from './features/login/login.component';
import Dashboard from './features/dashboard/dashboard.component';
import isAuthenticatedQuery from './authentication.graphql';

let App: FunctionComponent = () => {

	let location = useLocation();

	let {data: {isLoggedIn} = {isLoggedIn: false}} = useQuery(isAuthenticatedQuery);

	let renderAuthRedirect = () => {
		if (!isLoggedIn && location?.pathname !== '/login') {
			let destination = {
				pathname: '/login',
				state: {referrer: location},
			};
			return (
				<Redirect to={destination} />
			);
		}
	};

	return (
		<Switch>
			<Route exact from={'/login'} component={Login} />
			{renderAuthRedirect()}
			<Route exact from={'/'} component={Dashboard} />
		</Switch>
	);
};

export default App;
