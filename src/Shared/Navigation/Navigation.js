import React from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../../../images/logo.png';

const Navigation = () => {
  return (
    <div> 
    <div
        className=" flex items-center flex-shrink-0  w-full h-16 px-10 bg-white bg-opacity-75"
    >
        <img src={loginImg } alt="logo"className="h-10 w-10" />
        <div className="ml-10">
            <Link to="/projects"
                className="mx-2 text-sm font-semibold text-indigo-700"
                >Projects</Link
            >
            <Link to="/teamsHome"
                className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                
                >Team</Link
            >
        </div>
        <button
            className="flex items-center justify-center w-8 h-8 ml-auto overflow-hidden rounded-full cursor-pointer"
        >
            <img
                src="https://assets.codepen.io/5041378/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1600304177&width=512"
                alt=""
            />
        </button>
    </div>
   
</div>
  )
}

export default Navigation