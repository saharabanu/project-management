import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddProjectModal from '../../components/Modal/addProjectModal';
import Error from '../../components/UiLoader/Error';
import Loader from '../../components/UiLoader/Loader';
import { useFetchProjectsQuery } from '../../features/project/projectApi';
import { setAssignedProjectsQuery } from '../../features/project/projectSlice';
import { useGetTeamsQuery } from '../../features/team/teamApi';
import Column from './Column';


function Board() {
	const [isSkip, setIsSkip] = useState(true);
	const { email: loggedInUserEmail } = useSelector((state) => state?.auth?.user) || {};
	const { assignedProjectsQuery } = useSelector((state) => state.projects);
	const dispatch = useDispatch();

	//fetch Assign project
	const {
		data: projects,
		isSuccess,
		isError,
		isLoading,
	} = useFetchProjectsQuery(
		{ assignedProjectsQuery, sort: 'id', order: 'desc' },
		{
			skip: isSkip,
			refetchOnMountOrArgChange: true,
		}
	);

	//get assigned teams
	const { data: teams, isLoading: teamsLoading, isSuccess: teamsLoadingSuccess } = useGetTeamsQuery(loggedInUserEmail);

	//control modal
	const [showModal, setShowModal] = useState(false);
	const control = (value) => {
		setShowModal(value);
	};

	//set assigned Teams query to store
	useEffect(() => {
		if (!teamsLoading && teamsLoadingSuccess && teams?.length) {
			let assignedTeamsQuery = teams?.map((team) => `team=${team.name.toLowerCase()}`).join('&');
			dispatch(setAssignedProjectsQuery(assignedTeamsQuery));
			setIsSkip(false);
		}
	}, [teams, teamsLoading, teamsLoadingSuccess, dispatch]);

	//add correct color to project card
	let transformedProjects = projects?.map((project) => {
		for (let { name, color } of teams) {
			if (name === project.team) {
				project = { ...project, color };
			}
		}
		return project;
	});

	return (
		<>
			<div className='flex flex-grow px-10 mt-4 space-x-6 overflow-auto'>
				{isLoading && <Loader message='loading...' />}
				{!isLoading && isError && <Error message='some thing went wrong' />}

				{!isError && isSuccess && (
					<>
						<Column projects={transformedProjects} stage='Backlog' control={control}></Column>
						<Column projects={transformedProjects} stage='Ready'></Column>
						<Column projects={transformedProjects} stage='Doing'></Column>
						<Column projects={transformedProjects} stage='Review'></Column>
						<Column projects={transformedProjects} stage='Blocked'></Column>
						<Column projects={transformedProjects} stage='Done'></Column>
					</>
				)}
			</div>

			{showModal && <AddProjectModal control={control} assignedTeams={teams} />}
		</>
	);
}

export default Board;
