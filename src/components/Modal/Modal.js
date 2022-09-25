import React from 'react';
import { useRef } from 'react';
import { useOnClickOutside } from '../../utils';

function Modal({ control, children }) {
	const ref = useRef();
	useOnClickOutside(ref, () => {
		control(false);
	});

	return (
		<div className='antialiased bg-gray-900/20 text-gray-900 font-sans overflow-x-hidden fixed top-0 left-0 w-full h-full ml-0 mr-0'>
			<div className='relative px-4 min-h-screen flex items-center justify-center'>
				<div className='bg-black opacity-25 w-full h-full absolute z-10 inset-0'></div>
				<div className='bg-white rounded-lg max-w-lg px-4 py-8 inset-x-0 bottom-0 z-50' ref={ref}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default Modal;
