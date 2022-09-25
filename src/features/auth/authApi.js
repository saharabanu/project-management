import { signIn } from './authSlice';


const { default: apiSlice } = require('../api/apiSlice');

const authApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => {
				return {
					url: '/login',
					method: 'POST',
					body: data,
				};
			},

			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					let { data } = await queryFulfilled;

					if (data?.user?.id) {
						dispatch(
							signIn({
								user: data?.user,
								accessToken: data?.accessToken,
							})
						);
						localStorage.setItem('auth', JSON.stringify(data));
					}
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),
});

export const { useLoginMutation } = authApi;
