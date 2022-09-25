import apiSlice from '../api/apiSlice';
const projectApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		//fetch project if user assigned to the project or owner of the project
		fetchProjects: builder.query({
			query: (query) => {
				let { assignedProjectsQuery, author, sort, order } = query || {};
				let queryString = '';
				if (assignedProjectsQuery) queryString += assignedProjectsQuery;
				if (author) query += `&author=${author}`;
				if (sort) queryString += `&_sort=${sort}`;
				if (order) queryString += `&_order=${order}`;

				return {
					url: `/projects?${queryString}`,
				};
			},
		}),

		//project
		addNewProject: builder.mutation({
			query: (data) => ({
				url: '/projects',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Project'],
			async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
				let { assignedProjectsQuery } = getState().projects;
				try {
					const { data: newProject } = await queryFulfilled;
					if (newProject?.id) {
						dispatch(
							projectApi.util.updateQueryData(
								'fetchProjects',
								{ assignedProjectsQuery, sort: 'id', order: 'desc' },
								(draft) => {
									draft.unshift(newProject);
								}
							)
						);
					}
				} catch (error) {
					console.log(error);
				}
			},
		}),

		//update project
		updateProject: builder.mutation({
			query: ({ id, email, stage }) => {
				let toUpdate = {};
				if (stage) toUpdate = { ...toUpdate, stage };
				return {
					url: `/projects/${id}`,
					method: 'PATCH',
					body: toUpdate,
				};
			},

			// invalidatesTags: ['Project'],

			async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
				let { assignedProjectsQuery } = getState().projects;

				const patch = dispatch(
					projectApi.util.updateQueryData(
						'fetchProjects',
						{
							assignedProjectsQuery,
							sort: 'id',
							order: 'desc',
						},
						(draft) => {
							return (draft = draft.map((project) =>
								project.id === arg.id ? { ...project, stage: arg.stage } : project
							));
						}
					)
				);
				try {
					await queryFulfilled;
				} catch (error) {
					patch.undo();
				}
			},
		}),

		//delete project
		deleteProject: builder.mutation({
			query: ({ id, author }) => ({
				url: `/projects/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Project'],
			async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
				let { assignedProjectsQuery } = getState().projects || {};
				try {
					await queryFulfilled;
					dispatch(
						projectApi.util.updateQueryData(
							'fetchProjects',
							{ assignedProjectsQuery, sort: 'id', order: 'desc' },
							(draft) => {
								return (draft = draft.filter((project) => project.id !== arg.id));
							}
						)
					);
				} catch (error) {}
			},
		}),
	}),
});

export const { useFetchProjectsQuery, useAddNewProjectMutation, useUpdateProjectMutation, useDeleteProjectMutation } =
	projectApi;
