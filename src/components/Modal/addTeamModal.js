import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMutation } from "../../features/team/teamApi";
import Modal from "./Modal";


function AddTeamModal({ control }) {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [color, setColor] = useState('');
	const { user } = useSelector((state) => state.auth);

	const [addTeam, { isLoading }] = useAddTeamMutation(user?.email);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (name.trim() && desc.trim() && color.trim()) {
			addTeam({
				name: name.toLowerCase(),
				desc,
				color,
				author: user,
				members: [user?.email],
				createdAt: new Date(),
			});
			control(false);
		}
	};

	return (
		<Modal control={control}>
			<form onSubmit={handleSubmit}>
			 <h2> Add team</h2>
				<input type='text' placeholder='Team Name' className="border mb-2 py-3 px-2"required onChange={(e) => setName(e.target.value)} style={{outline:"none"}}/>
				<br />
				<input type='text' className="border mb-2 py-3 px-2" placeholder='Short Desc' required onChange={(e) => setDesc(e.target.value)} style={{outline:"none"}}/>
				<br />
				<input className="border mb-2 py-3 px-2"
					type='text'
					placeholder='Any color'
					required
					onChange={(e) => setColor(e.target.value)}
					style={{outline:"none"}}/>
				<div className='text-center text-right mt-4 flex'>
					<button
						className='inline-block w-auto px-4 py-3 py-2 bg-green-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='submit'
						disabled={isLoading}>
						Create
					</button>
					<button
						className='ml-2 inline-block w-auto px-4 py-3 py-2 bg-red-300 rounded-lg font-semibold text-sm mt-4 mt-0 order-1'
						type='button'
						onClick={() => control(false)}>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default AddTeamModal;
