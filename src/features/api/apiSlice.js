import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.REACT_APP_API_URL,
	prepareHeaders: async (headers, { getState }) => {
		const token = getState()?.auth?.accessToken;
		headers.set('token', token);
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		let result = await baseQuery(args, api, extraOptions);

		if (result?.error?.status === 401) {
			api.dispatch(logout());
			localStorage.clear();
		}
		return result;
	},
	// tagTypes: ['Team'],
	endpoints: () => ({}),
});

export default apiSlice;
