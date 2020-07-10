import * as React from 'react';
import {FunctionComponent, useEffect, useState} from 'react';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from '@apollo/react-hooks';
import {persistCache} from 'apollo-cache-persist';
import {BrowserRouter} from 'react-router-dom';
import {render} from 'react-dom';
import {setContext} from 'apollo-link-context';
import App from './app.component';

export let Root: FunctionComponent = () => {

	let [client, setClient] = useState(undefined);

	useEffect(() => {
		let cache = new InMemoryCache();

		const authLink = setContext((_, { headers }) => {
			let token = localStorage.getItem('token');
			return {
				headers: {
					...headers,
					Authorization: token ? `Bearer ${token}` : '',
				},
			};
		});

		let link = authLink.concat(createHttpLink({
			uri: 'https://gravitel-graphql-backend.herokuapp.com/graphql',
		}));

		let newClient = new ApolloClient({
			cache,
			link,
			resolvers: {},
		});

		let initData = {
			isLoggedIn: !!localStorage.getItem('token'),
		};

		cache.writeData({data: initData});

		let handleResetStore = async () => cache.writeData({
			data: {
				isLoggedIn: !!localStorage.getItem('token'),
			},
		});
		// TODO: investigate how to disable cache for login mutation
		persistCache({
			cache,
			storage: window.localStorage,
			// TODO: investigate how to customize auto-generated scheme
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			resolvers: {},
		})
			.then(() => {
				newClient.onResetStore(handleResetStore);
				setClient(newClient);
			});

		return () => {};
	}, []);

	if (client === undefined) {
		return <div>{'Подготовка...'}</div>;
	}

	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ApolloProvider>
	);
};

export default Root;

render(
	<Root />,
	document.getElementById('root'),
);
