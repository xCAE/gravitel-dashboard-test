export interface ILoginResponse {
	token: string
}

export interface ILoginMutation {
	login: ILoginResponse;
}

export interface ILoginMutationParameters {
	username: string,
	password: string,
}
