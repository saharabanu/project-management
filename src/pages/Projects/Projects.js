import { useDispatch } from 'react-redux';
import Footer from '../../Shared/Footer/Footer';
import ProjectNavigation from '../../Shared/ProjectNavigation/ProjectNavigation';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './Board';


const Projects = () => {
	const dispatch = useDispatch();

	
	return (
		<>
			<div className='flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200'>
				<ProjectNavigation/>
				<div className='px-10 mt-6'>
					<h1 className='text-2xl font-bold'>Project Board</h1>
				</div>
				<DndProvider backend={HTML5Backend}>
					<Board />
				</DndProvider>
			</div>
			<Footer/>
		</>
	);
};

export default Projects;
