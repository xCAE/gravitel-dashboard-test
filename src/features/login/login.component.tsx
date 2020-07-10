import * as React from 'react';
import {ChangeEvent, FunctionComponent, useState} from 'react';

let Login: FunctionComponent = () => {
	let [{username, password}, setState] = useState({username: '', password: ''});

	let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	let handleChange = ({target: {value, name}}: ChangeEvent<HTMLInputElement>) => {
		setState((state: { username: string, password: string }) => ({...state, [name]: value}));
	};

	return (
		<form
			onSubmit={handleSubmit}
		>
			<input
				required
				id={'username'}
				value={username}
				name={'username'}
				type={'username'}
				onChange={handleChange}
			/>
			<input
				required
				value={password}
				id={'password'}
				name={'password'}
				type={'password'}
				onChange={handleChange}
			/>
			<button
				type="submit"
			>
				{'Войти'}
			</button>

		</form>
	);
};

export default Login;
