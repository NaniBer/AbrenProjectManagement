const initialState = {
  projectLoaded: false,
  project: null,
};
const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_PROJECT":
      return {
        ...state,
        projectLoaded: true,
        project: action.payload,
      };
    case "UNLOAD_PROJECT":
      return {
        ...state,
        projectLoaded: false,
        project: null,
      };
    case "DELETE_RESOURCE":
      const deletedResourceId = action.payload;
      // Find the index of the resource in the project resources array
      const resourceIndexToDelete = state.project.resources.findIndex(
        (resource) => resource._id === deletedResourceId
      );
      // Remove the resource from the resources array in the state
      return {
        ...state,
        project: {
          ...state.project,
          resources: [
            ...state.project.resources.slice(0, resourceIndexToDelete),
            ...state.project.resources.slice(resourceIndexToDelete + 1),
          ],
        },
      };

    case "ADD_RESOURCE":
      const newResource = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          resources: [...state.project.resources, newResource],
        },
      };

    default:
      return state;
  }
};
export default projectReducer;
