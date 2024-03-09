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
    case "EDIT_RESOURCE":
      const updatedResource = action.payload;
      // Find the index of the resource in the project resources array
      const resourceIndex = state.project.resources.findIndex(
        (resource) => resource._id === updatedResource._id
      );
      // Update the resource details in the state
      return {
        ...state,
        project: {
          ...state.project,
          resources: [
            ...state.project.resources.slice(0, resourceIndex),
            updatedResource,
            ...state.project.resources.slice(resourceIndex + 1),
          ],
        },
      };

    case "DELETE_MILESTONE":
      const milestoneId = action.payload;
      // Find the index of the milestone in the project milestones array
      const milestobeIndexToDelete = state.project.milestones.findIndex(
        (milestone) => milestone._id === milestoneId
      );
      // Remove the milestone from the milestones array in the state
      return {
        ...state,
        project: {
          ...state.project,
          milestones: [
            ...state.project.milestones.slice(0, milestobeIndexToDelete),
            ...state.project.milestones.slice(milestobeIndexToDelete + 1),
          ],
        },
      };

    case "ADD_MILESTONE":
      const newMilestone = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          milestones: [...state.project.milestones, newMilestone],
        },
      };

    default:
      return state;
  }
};
export default projectReducer;
