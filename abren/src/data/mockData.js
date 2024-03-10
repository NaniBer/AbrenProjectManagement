// import { tokens } from "../theme";

export const Team = [
  {
    id: 1,
    name: "Saron Bisrat",
    email: "jonsnow@gmail.com",
    username: "saronbisrat.kaizen",
    role: "admin",
    status: "inactive",
  },
  {
    id: 1,
    name: "Romhay Yemane",
    email: "jonsnow@gmail.com",
    username: "saronbisrat.kaizen",
    role: "admin",
    status: "active",
  },
  {
    id: 1,
    name: "Nazrawit Berhanu",
    email: "jonsnow@gmail.com",
    username: "saronbisrat.kaizen",
    role: "admin",
    status: "inactive",
  },
  {
    id: 1,
    name: "Nardos Dagnachew",
    email: "jonsnow@gmail.com",
    username: "saronbisrat.kaizen",
    role: "admin",
    status: "active",
  },
  // Add more team members...
];
export const Task = [
  {
    taskList: "Task 1",
    startDate: "2024-02-21",
    endDate: "2024-02-28",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    teamMembers: [
      { id: 1, firstname: "John", lastname: "Doe", email: "john@example.com" },
      { id: 2, firstname: "Jane", lastname: "Doe", email: "jane@example.com" },
    ],
    subtasks: ["Subtask 1", "Subtask 2", "Subtask 3"],
  },
  {
    taskList: "Task 2",
    startDate: "2024-03-01",
    endDate: "2024-03-07",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    teamMembers: [
      {
        id: 3,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
      },
      { id: 4, firstname: "Bob", lastname: "Smith", email: "bob@example.com" },
    ],
    subtasks: ["Subtask 1", "Subtask 2"],
  },
];

export const Project = [
  {
    id: 1,
    name: "Project A",
    startDate: "2024-02-21",
    endDate: "2024-02-28",
    teamMembers: [
      { id: 1, firstname: "John", lastname: "Doe", email: "john@example.com" },
      { id: 2, firstname: "Jane", lastname: "Doe", email: "jane@example.com" },
    ],
    tasks: [
      { id: 1, name: "Task 1", progress: 80 },
      { id: 2, name: "Task 2", progress: 50 },
      { id: 3, name: "Task 3", progress: 100 },
    ],
  },
  {
    id: 2,
    name: "Project B",
    startDate: "2024-03-01",
    endDate: "2024-03-07",
    teamMembers: [
      {
        id: 3,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
      },
      { id: 4, firstname: "Bob", lastname: "Smith", email: "bob@example.com" },
    ],
    tasks: [
      { id: 4, name: "Task 1", progress: 60 },
      { id: 5, name: "Task 2", progress: 30 },
      { id: 6, name: "Task 3", progress: 90 },
    ],
  },
  {
    id: 2,
    name: "Project C",
    startDate: "2024-03-06",
    endDate: "2024-03-12",
    teamMembers: [
      {
        id: 3,
        firstname: "Alice",
        lastname: "Smith",
        email: "alice@example.com",
      },
      { id: 4, firstname: "Bob", lastname: "Smith", email: "bob@example.com" },
    ],
    tasks: [
      { id: 4, name: "Task 1", progress: 70 },
      { id: 5, name: "Task 2", progress: 100 },
      { id: 6, name: "Task 3", progress: 90 },
    ],
  },
];

export const profile = [
  {
    id: 1,
    firstname: "Saron",
    lastname: "Bisrat",
    email: "jonsnow@gmail.com",
    username: "saronbisrat.kaizen",
    status: "inactive",
  },
];

export const mockDataTeam = [
  {
    id: 1,
    firstname: "Saron",
    lastname: "Bisrat",
    email: "jonsnow@gmail.com",
    username: "saronbisrat.kaizen",
    status: "inactive",
  },
  {
    id: 2,
    firstname: "Romhay",
    lastname: "Yemane",
    email: "jonsnow@gmail.com",
    username: "romahayyemane.kaizen",
    status: "active",
  },
  {
    id: 3,
    firstname: "Nazrawit",
    lastname: "Berhanu",
    email: "jaimelannister@gmail.com",
    username: "nazrawitberhanu.kaizen",
    status: "inactive",
  },
  {
    id: 4,
    firstname: "Nardos",
    lastname: "Dagnachew",
    email: "jaimelannister@gmail.com",
    username: "nardosdagnachew.kaizen",
    status: "inactive",
  },
];

export const mockDataProject = [
  {
    id: 1,
    projectname: "Kaizen website",
    description: "kaizen is a tech company ",
    projectmanager: "saronbisrat.kaizen",
    status: "active",
  },
  {
    id: 2,
    projectname: "Something website",
    description: "smth is a tech company  ",
    projectmanager: "saronbisrat.kaizen",
    status: "inactive",

  },
  {
    id: 3,
    projectname: "Hello World Website",
    description: 
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    projectmanager: "helloworld.hello",
    status: "inactive",

  },
];


export const mockAssignedProject = [
  {
    id: 1,
    projectname: "Kaizen website",
    description: 
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    projectname: "Something website",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

  },
  {
    id: 3,
    projectname: "Hello World Website",
    description: 
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];


export const projectData = {
  projectName: "Project 1",
  projectOverview:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.",
  reportDate: "February 24, 2024",
  currentStatus:
    "The project has successfully completed the development phase and is now entering the testing phase. Major milestones achieved include:",
  milestones: [
    "Completed Phase 1 development tasks",
    "Finalized vendor contracts for Phase 2",
    "Conducted stakeholder meeting to review progress",
  ],
  resourceAllocation: {
    teamMembers: [
      { id: 1, name: "John Doe", role: "Project Manager" },
      { id: 2, name: "Jane Smith", role: "Developer" },
      { id: 3, name: "Alex Johnson", role: "Designer" },
      { id: 4, name: "Emily Brown", role: "QA Tester" },
      { id: 5, name: "Michael Lee", role: "Business Analyst" },
      // Add more team members as needed
    ],
    budget: "$100,000",
    timeline: "6 months",
    technology: "React, Node.js, MongoDB",
    equipment: "High-end workstations, cloud servers",
    training: "Team training sessions on new technologies",
    otherResources: "External consultants for specialized tasks",
  },
  nextSteps: [
    "Complete Phase 2 development tasks",
    "Review and approve Phase 3 project plan",
    "Prepare for upcoming project presentation",
  ],
  actionItems: [
    "Schedule weekly progress meetings",
    "Allocate additional resources for Phase 2",
    "Address any outstanding issues reported during testing",
  ],
};

export const budgetVsActualData = [
  { category: 'Category 1', planned: 5000, actual: 6000 },
  { category: 'Category 2', planned: 8000, actual: 7500 },
  { category: 'Category 3', planned: 3000, actual: 4000 },
  { category: 'Category 4', planned: 6000, actual: 5500 },
  { category: 'Category 5', planned: 6000, actual: 5500 },
  { category: 'Category 6', planned: 6000, actual: 5500 },
  // Add more data as needed
];

export const scheduleStatusData = [
  { date: '2022-09-01', completed: 20, inProgress: 50, notStarted: 30 },
  { date: '2022-09-02', completed: 25, inProgress: 45, notStarted: 30 },
  { date: '2022-09-03', completed: 30, inProgress: 40, notStarted: 30 },
  // Add more data as needed
];

export const DashboardTMdata = [
  {
    id: "1",
    taskName: "Task 1",
    dueDate: new Date("2024-03-31"),
    status: "Not Started",
    priority: "High",
  },
  {
    id: "2",
    taskName: "Task 2",
    dueDate: new Date("2024-04-10"),
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "3",
    taskName: "Task 3",
    dueDate: new Date("2024-04-15"),
    status: "Completed",
    priority: "Low",
  },
  {
    id: "4",
    taskName: "Task 4",
    dueDate: new Date("2024-03-10"),
    status: "Not Started",
    priority: "Low",
  },
  {
    id: "5",
    taskName: "Task 5",
    dueDate: new Date("2024-03-10"),
    status: "Not Started",
    priority: "High",
  },
];

export const dummyProjectData = [
  {
    name: 'Project 1',
    startDate: '2024-03-09',
    endDate: '2024-03-12',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.',
    tasks: ['Task1', 'Task2', 'Task3'],
  },
  {
    name: 'Project 2',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    description:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut scelerisque auctor nibh vitae vestibulum.',
    tasks: ['TaskA', 'TaskB', 'TaskC'],
  },
  {
    name: 'Project 3',
    startDate: '2024-03-25',
    endDate: '2024-04-01',
    description:
      'Donec posuere nisi et neque ullamcorper scelerisque. Fusce at augue massa. Nullam vel viverra elit. Vivamus dignissim hendrerit pulvinar. Integer venenatis vehicula ultrices.',
    tasks: ['TaskX', 'TaskY', 'TaskZ'],
  },
  {
    name: 'Project 4',
    startDate: '2024-03-25',
    endDate: '2024-04-01',
    description:
      'Donec posuere nisi et neque ullamcorper scelerisque. Fusce at augue massa. Nullam vel viverra elit. Vivamus dignissim hendrerit pulvinar. Integer venenatis vehicula ultrices.',
    tasks: ['TaskX', 'TaskY', 'TaskZ'],
  },
];