import React from 'react';
import loginImg from '../../../images/logo.png';

const Footer = () => {
  return (
    <>
       <a 
            class="fixed bottom-0 right-0 flex items-center justify-center h-8 pl-1 pr-2 mb-6 mr-4 text-blue-100 bg-indigo-600 rounded-full shadow-lg hover:bg-blue-600"
            href="https://learnwithsumit.com"
            target="_blank" rel="noreferrer" 
        >
            <div
                class="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full"
            >
                <img src={loginImg} alt="LWS Logo" />
            </div>
            <span class="ml-1 text-sm leading-none">Learn with Sumit</span>
        </a>
    </>
  )
}

export default Footer