const { createSlice } = require('@reduxjs/toolkit');

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		user: {},
		accessToken: '',
	},

	reducers: {
		signIn: (state, action) => {
			state.user = action?.payload?.user;
			state.accessToken = action?.payload?.accessToken;
		},
		logOut: (state) => {
			state.user = {};
			state.accessToken = '';
			localStorage.clear();
		},
	},
});

export default authSlice.reducer;
export const { signIn, logOut } = authSlice.actions;
