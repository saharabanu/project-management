import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/UiLoader/Error';
import { useLoginMutation } from '../../features/auth/authApi';
import logoImg from '../../images/logo.png';
function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [login, { data, isLoading, error: responseError }] = useLoginMutation();
	const navigate = useNavigate();
	const [error, setError] = useState('');

	useEffect(() => {
		if (responseError?.data) {
			setError(responseError.data);
		}
		if (data?.accessToken && data?.user) {
			navigate('/teams');
		}
	}, [data, responseError, navigate]);

	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
	};

	return (
		<div className='grid place-items-center h-screen bg-[#F9FAFB'>
			<div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<div>
						<img className='mx-auto h-12 w-auto' src={logoImg } alt='Learn with Sumit' />
						<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
					</div>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit}>
					
						<div className='rounded-md shadow-sm -space-y-px'>
							<div>
								<label className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									name='email'
									type='email'
									autoComplete='email'
									required
									value={email}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm'
									placeholder='Email address'
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
                            <br />
							<div>
								<label className='sr-only'>
									Password
								</label>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									value={password}
									className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm'
									placeholder='Password'
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								disabled={isLoading}
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'>
								Sign in
							</button>
						</div>
					</form>

					{error !== '' && <Error message={error} />}
					
				</div>
			</div>
		</div>
	);
}

export default Login;