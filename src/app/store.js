import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice'
import projectReducer from '../features/project/projectSlice'


export const store = configureStore({
  reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		projects: projectReducer,

		
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
