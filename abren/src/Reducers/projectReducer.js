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
    case "EDIT_MILESTONE":
      const updatedMilestone = action.payload;
      console.log(updatedMilestone);
      // Find the index of the resource in the project resources array
      const milestoneIndex = state.project.milestones.findIndex(
        (milestone) => milestone._id === updatedMilestone._id
      );
      // Update the resource details in the state
      return {
        ...state,
        project: {
          ...state.project,
          resources: [
            ...state.project.resources.slice(0, milestoneIndex),
            updatedMilestone,
            ...state.project.resources.slice(milestoneIndex + 1),
          ],
        },
      };
    case "DELETE_TASK":
      const taskId = action.payload;
      // Find the index of the task in the project tasks array
      const taskIndexToDelete = state.project.tasks.findIndex(
        (task) => task._id === taskId
      );
      // Remove the task from the Task array in the state
      return {
        ...state,
        project: {
          ...state.project,
          tasks: [
            ...state.project.tasks.slice(0, taskIndexToDelete),
            ...state.project.tasks.slice(taskIndexToDelete + 1),
          ],
        },
      };

    case "ADD_TASK":
      const newTask = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          tasks: [...state.project.tasks, newTask],
        },
      };
    case "EDIT_TASK":
      const updatedTask = action.payload;
      console.log(updatedTask);
      // Find the index of the resource in the project resources array
      const taskIndex = state.project.tasks.findIndex(
        (task) => task._id === updatedTask._id
      );
      // Update the resource details in the state
      return {
        ...state,
        project: {
          ...state.project,
          tasks: [
            ...state.project.tasks.slice(0, taskIndex),
            updatedTask,
            ...state.project.tasks.slice(taskIndex + 1),
          ],
        },
      };
    case "REPLACE_TASKS":
      const newTasks = action.payload;
      return {
        ...state,
        project: {
          ...state.project,
          tasks: newTasks,
        },
      };

    case "DELETE_TODO":
      const todoIdToDelete = action.payload;
      // Find the index of the todo in the todos array
      const todoIndexToDelete = state.todos.findIndex(
        (todo) => todo._id === todoIdToDelete
      );
      // Remove the todo from the todos array in the state
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, todoIndexToDelete),
          ...state.todos.slice(todoIndexToDelete + 1),
        ],
      };

    case "ADD_TODO":
      const newTodo = action.payload;
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };

    case "EDIT_TODO":
      const updatedTodo = action.payload;
      // Find the index of the todo in the todos array
      const todoIndex = state.todos.findIndex(
        (todo) => todo._id === updatedTodo._id
      );
      // Update the todo details in the state
      return {
        ...state,
        todos: [
          ...state.todos.slice(0, todoIndex),
          updatedTodo,
          ...state.todos.slice(todoIndex + 1),
        ],
      };

    case "LOAD_TODOS":
      const loadedTodos = action.payload;
      return {
        ...state,
        todos: loadedTodos,
      };

    default:
      return state;
  }
};
export default projectReducer;
