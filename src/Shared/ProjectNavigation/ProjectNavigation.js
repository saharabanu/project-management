import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../features/auth/authSlice';
import { debounce } from '../../utils'

import loginImg from '../../images/logo.png';
import { search } from '../../features/project/projectSlice';

const ProjectNavigation = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth) || {};
    const handleSearch = (e) => {
		dispatch(search(e.target.value.toLowerCase()));
	};

    const handleLogOut = () => {
		dispatch(logOut());
	};
  return (
    <div> 
    <div
        className=" flex items-center flex-shrink-0  w-full h-16 px-10 bg-white bg-opacity-75"
    >
        <img src={loginImg } alt="logo"className="h-10 w-10" />
        <input
						className='flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring'
						type='search'
						placeholder='Search for anything…'
						onChange={debounce(handleSearch, 400)}
					/>
        <div className="ml-10">
            <Link to="/projects"
                className="mx-2 text-sm font-semibold text-indigo-700"
                >Projects</Link
            >
            <Link to="/teams"
                className="mx-2 text-sm font-semibold text-gray-600 hover:text-indigo-700"
                
                >Teams</Link
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
        <p className='ml-2'>{user?.name}</p>
                    <button className='font-semibold text-sm hover:text-indigo-700 px-3' onClick={handleLogOut}>
									LogOut
								</button>
       
    </div>
   
   
</div>
  )
}

export default ProjectNavigation;