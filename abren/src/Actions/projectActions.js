export const loadProject = (project) => ({
  type: "LOAD_PROJECT",
  payload: project,
});

export const unloadProject = (project) => ({
  type: "UNLOAD_PROJECT",
});

export const editResource = (updatedResource) => ({
  type: "EDIT_RESOURCE",
  payload: updatedResource,
});
export const addResource = (newResource) => ({
  type: "ADD_RESOURCE",
  payload: newResource,
});
export const deleteResource = (id) => ({
  type: "DELETE_RESOURCE",
  payload: id,
});
export const addMilestone = (newMilestone) => ({
  type: "ADD_MILESTONE",
  payload: newMilestone,
});
export const deleteMilestone = (id) => ({
  type: "DELETE_MILESTONE",
  payload: id,
});
export const editMilestone = (updatedMilestone) => ({
  type: "EDIT_RESOURCE",
  payload: updatedMilestone,
});
