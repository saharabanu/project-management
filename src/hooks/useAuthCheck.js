import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn } from '../features/auth/authSlice';

export default function useAuthCheck() {
	const [authChecked, setAuthChecked] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		let auth = JSON.parse(localStorage.getItem('auth'));
		if (auth && auth.user && auth.accessToken) {
			dispatch(signIn({ user: auth.user, accessToken: auth.accessToken }));
		}
		setAuthChecked(true);
	}, [dispatch]);

	return authChecked;
}
