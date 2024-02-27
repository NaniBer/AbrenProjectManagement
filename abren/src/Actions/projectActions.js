export const loadProject = (project) => ({
  type: "LOAD_PROJECT",
  payload: project,
});

export const unloadProject = (project) => ({
  type: "UNLOAD_PROJECT",
});
