import * as React from 'react';
import {ChangeEvent, FunctionComponent, useEffect, useState} from 'react';
import ApolloClient from 'apollo-client';
import {useApolloClient, useMutation, useQuery} from '@apollo/react-hooks';
import {useHistory, useLocation} from 'react-router';
import {ILoginMutation, ILoginMutationParameters} from './login.interfaces';
import LoginMutation from './login.graphql';
import isAuthenticatedQuery from '../../authentication.graphql';
import {useLoginStyles} from './login.styles';

let Login: FunctionComponent = () => {
	let history = useHistory();
	let location = useLocation();
	let client: ApolloClient<object> = useApolloClient();
	let styles = useLoginStyles();
	let [{username, password}, setState] = useState({username: '', password: ''});

	let onCompleted = ({login}: ILoginMutation) => {
		localStorage.setItem('token', login?.token);
		client.writeData({data: {isLoggedIn: !!login?.token}});
	};

	let [logIn, {error, loading}] = useMutation<ILoginMutation, ILoginMutationParameters>(
		LoginMutation,
		{onCompleted},
	);

	let {data: {isLoggedIn} = {isLoggedIn: undefined}} = useQuery(isAuthenticatedQuery);

	useEffect(() => {
		if (isLoggedIn) {
			let referrer = location?.state?.referrer || {};
			let {pathname} = referrer;
			let direction = pathname && pathname !== '/login' ? referrer : {pathname: '/'};

			history.push(direction);
		}
	}, [isLoggedIn]);

	let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		logIn({
			variables: {password, username},
		});
	};

	let handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
		setState((state: { username: string, password: string }) => ({...state, [name]: value}));
	};

	let renderError = () => {
		if (error) {
			return (error?.message || 'Что-то пошло не так, попробуй ввести другие данные');
		}
	};

	return (
		<div style={styles.loginRoot}>
			<div style={styles.loginCard}>
				<div style={styles.loginCardContent}>
					<div style={styles.loginCaption}>
						<span>{'Вход'}</span>
						<div style={styles.loginDescription}>
							{'Уникальная технология доступная для вашего бизнеса уже сейчас!'}
						</div>
					</div>
					<form
						onSubmit={handleSubmit}
						style={styles.loginForm}
					>
						<input
							required
							id={'username'}
							name={'username'}
							type={'username'}
							autoComplete={'username'}
							onChange={handleChange}
							placeholder={'Логин'}
							style={styles.loginFormInput}
						/>
						<input
							required
							autoFocus
							id={'password'}
							name={'password'}
							type={'password'}
							autoComplete={'password'}
							onChange={handleChange}
							placeholder={'Пароль'}
							style={styles.loginFormInput}
						/>
						<button
							style={styles.loginFormButton}
							type="submit"
							disabled={loading || !username || !password}
						>
							{'Войти'}
						</button>
						<label
							htmlFor={'password'}
							style={styles.loginFormValidationMessage}
						>
							{renderError()}
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
