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
    endDate: "2024-03-10",
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
  // {
  //   id: 2,
  //   name: "Project B",
  //   startDate: "2024-03-01",
  //   endDate: "2024-03-07",
  //   teamMembers: [
  //     {
  //       id: 3,
  //       firstname: "Alice",
  //       lastname: "Smith",
  //       email: "alice@example.com",
  //     },
  //     { id: 4, firstname: "Bob", lastname: "Smith", email: "bob@example.com" },
  //   ],
  //   tasks: [
  //     { id: 4, name: "Task 1", progress: 60 },
  //     { id: 5, name: "Task 2", progress: 30 },
  //     { id: 6, name: "Task 3", progress: 90 },
  //   ],
  // },
  // {
  //   id: 2,
  //   name: "Project C",
  //   startDate: "2024-03-06",
  //   endDate: "2024-03-12",
  //   teamMembers: [
  //     {
  //       id: 3,
  //       firstname: "Alice",
  //       lastname: "Smith",
  //       email: "alice@example.com",
  //     },
  //     { id: 4, firstname: "Bob", lastname: "Smith", email: "bob@example.com" },
  //   ],
  //   tasks: [
  //     { id: 4, name: "Task 1", progress: 70 },
  //     { id: 5, name: "Task 2", progress: 100 },
  //     { id: 6, name: "Task 3", progress: 90 },
  //   ],
  // },
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

export const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
  },
];

//     country: "AD",
//     "hot dog": 137,
//     "hot dogColor": "hsl(229, 70%, 50%)",
//     burger: 96,
//     burgerColor: "hsl(296, 70%, 50%)",
//     kebab: 72,
//     kebabColor: "hsl(97, 70%, 50%)",
//     donut: 140,
//     donutColor: "hsl(340, 70%, 50%)",
//   },
//   {
//     country: "AE",
//     "hot dog": 55,
//     "hot dogColor": "hsl(307, 70%, 50%)",
//     burger: 28,
//     burgerColor: "hsl(111, 70%, 50%)",
//     kebab: 58,
//     kebabColor: "hsl(273, 70%, 50%)",
//     donut: 29,
//     donutColor: "hsl(275, 70%, 50%)",
//   },
//   {
//     country: "AF",
//     "hot dog": 109,
//     "hot dogColor": "hsl(72, 70%, 50%)",
//     burger: 23,
//     burgerColor: "hsl(96, 70%, 50%)",
//     kebab: 34,
//     kebabColor: "hsl(106, 70%, 50%)",
//     donut: 152,
//     donutColor: "hsl(256, 70%, 50%)",
//   },
//   {
//     country: "AG",
//     "hot dog": 133,
//     "hot dogColor": "hsl(257, 70%, 50%)",
//     burger: 52,
//     burgerColor: "hsl(326, 70%, 50%)",
//     kebab: 43,
//     kebabColor: "hsl(110, 70%, 50%)",
//     donut: 83,
//     donutColor: "hsl(9, 70%, 50%)",
//   },
//   {
//     country: "AI",
//     "hot dog": 81,
//     "hot dogColor": "hsl(190, 70%, 50%)",
//     burger: 80,
//     burgerColor: "hsl(325, 70%, 50%)",
//     kebab: 112,
//     kebabColor: "hsl(54, 70%, 50%)",
//     donut: 35,
//     donutColor: "hsl(285, 70%, 50%)",
//   },
//   {
//     country: "AL",
//     "hot dog": 66,
//     "hot dogColor": "hsl(208, 70%, 50%)",
//     burger: 111,
//     burgerColor: "hsl(334, 70%, 50%)",
//     kebab: 167,
//     kebabColor: "hsl(182, 70%, 50%)",
//     donut: 18,
//     donutColor: "hsl(76, 70%, 50%)",
//   },
//   {
//     country: "AM",
//     "hot dog": 80,
//     "hot dogColor": "hsl(87, 70%, 50%)",
//     burger: 47,
//     burgerColor: "hsl(141, 70%, 50%)",
//     kebab: 158,
//     kebabColor: "hsl(224, 70%, 50%)",
//     donut: 49,
//     donutColor: "hsl(274, 70%, 50%)",
//   },
// ];

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
  { category: "Category 1", planned: 5000, actual: 6000 },
  { category: "Category 2", planned: 8000, actual: 7500 },
  { category: "Category 3", planned: 3000, actual: 4000 },
  { category: "Category 4", planned: 6000, actual: 5500 },
  { category: "Category 5", planned: 6000, actual: 5500 },
  { category: "Category 6", planned: 6000, actual: 5500 },
  // Add more data as needed
];

export const scheduleStatusData = [
  { date: "2022-09-01", completed: 20, inProgress: 50, notStarted: 30 },
  { date: "2022-09-02", completed: 25, inProgress: 45, notStarted: 30 },
  { date: "2022-09-03", completed: 30, inProgress: 40, notStarted: 30 },
  // Add more data as needed
];

export const DashboardTMdata = [
  {
    id: "1",
    taskName:
      "Conduct user research to understand the target audience's needs and preferences.",
    dueDate: new Date("2024-03-13"),
    status: "Not Started",
    priority: "High",
  },
  {
    id: "2",
    taskName:
      "Develop a content strategy and create engaging content for the website.",
    dueDate: new Date("2024-03-12"),
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "3",
    taskName:
      "Develop backend infrastructure and manage the database for the website.",
    dueDate: new Date("2024-04-15"),
    status: "Completed",
    priority: "Low",
  },
  {
    id: "4",
    taskName:
      "Conduct thorough testing to ensure the website's functionality, usability, and performance.",
    dueDate: new Date("2024-03-15"),
    status: "Not Started",
    priority: "Low",
  },
  {
    id: "5",
    taskName:
      "Optimize the website for search engines to improve visibility and organic traffic",
    dueDate: new Date("2024-03-10"),
    status: "Not Started",
    priority: "High",
  },
  {
    id: "6",
    taskName: "Do the UI of the new e-learning dashboard",
    dueDate: new Date("2024-03-10"),
    status: "Not Started",
    priority: "High",
  },
];

export const mockUpdatedDataProject = [
  {
    id: 1,
    projectname: "Kaizen website",
    description: "kaizen is a tech company ",
    projectmanager: "saronbisrat.kaizen",
    status: "active",
    startDate: "2024-03-12",
    endDate: "2024-03-13",
  },
  {
    id: 1,
    projectname: "New website",
    description: "kaizen is a tech company ",
    projectmanager: "saronbisrat.kaizen",
    status: "active",
    startDate: "2024-03-12",
    endDate: "2024-03-12",
  },
];
export const dummyProjectData = [
  {
    name: "Project 1",
    startDate: "2024-03-12",
    endDate: "2024-03-13",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.",
    tasks: ["Task1", "Task2", "Task3"],
  },
  {
    name: "Project 2",
    startDate: "2024-03-15",
    endDate: "2024-03-14",
    description:
      "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut scelerisque auctor nibh vitae vestibulum.",
    tasks: ["TaskA", "TaskB", "TaskC"],
  },
  {
    name: "Project 3",
    startDate: "2024-03-25",
    endDate: "2024-04-01",
    description:
      "Donec posuere nisi et neque ullamcorper scelerisque. Fusce at augue massa. Nullam vel viverra elit. Vivamus dignissim hendrerit pulvinar. Integer venenatis vehicula ultrices.",
    tasks: ["TaskX", "TaskY", "TaskZ"],
  },
  {
    name: "Project 4",
    startDate: "2024-03-25",
    endDate: "2024-04-01",
    description:
      "Donec posuere nisi et neque ullamcorper scelerisque. Fusce at augue massa. Nullam vel viverra elit. Vivamus dignissim hendrerit pulvinar. Integer venenatis vehicula ultrices.",
    tasks: ["TaskX", "TaskY", "TaskZ"],
  },
];

export const updatedTasks = [
  {
    id: 1,
    taskName: "Task 1",
    date: "2024-03-04",
    project: "Project A",
    completed: false,
  },
  {
    id: 2,
    taskName: "Task 2",
    date: "2024-03-08",
    project: "Project B",
    completed: false,
  },
  {
    id: 3,
    taskName: "Task 3",
    date: "2024-03-09",
    project: "Project C",
    completed: false,
  },
  {
    id: 4,
    taskName: "Task 4",
    date: "2024-03-09",
    project: "Project D",
    completed: true,
  },
];

export const dummyTaskData = {
  name: "Task 1",
  startDate: "2024-03-09",
  endDate: "2024-03-12",
  project: "Project X",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.",
  subtasks: ["Subtask 1", "Subtask 2", "Subtask 3"],
};

export const assignedTask = [
  {
    taskName: "Task 1",
    startDate: "2024-03-09",
    endDate: "2024-03-13",
    project: "Project X",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.",
    subtasks: ["Subtask 1", "Subtask 2", "Subtask 3"],
  },
  {
    taskName: "Task 2",
    startDate: "2024-03-09",
    endDate: "2024-03-14",
    project: "Project X",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id turpis at urna tincidunt sodales sed id turpis. Mauris non leo a metus tempus gravida.",
    subtasks: ["Subtask 1", "Subtask 2", "Subtask 3"],
  },
];

export const PMtodolost = [
  {
    id: "1",
    taskName: " PM user research",
    dueDate: new Date("2024-03-13"),
    status: "Not Started",
    priority: "High",
  },
  {
    id: "2",
    taskName:
      " PM Develop a content strategy and create engaging content for the website.",
    dueDate: new Date("2024-03-12"),
    status: "In Progress",
    priority: "Medium",
  },
  {
    id: "3",
    taskName:
      " PM Develop backend infrastructure and manage the database for the website.",
    dueDate: new Date("2024-04-15"),
    status: "Completed",
    priority: "Low",
  },
  {
    id: "4",
    taskName:
      "PM Conduct thorough testing to ensure the website's functionality, usability, and performance.",
    dueDate: new Date("2024-03-15"),
    status: "Not Started",
    priority: "Low",
  },
  {
    id: "5",
    taskName:
      "PM Optimize the website for search engines to improve visibility and organic traffic",
    dueDate: new Date("2024-03-10"),
    status: "Not Started",
    priority: "High",
  },
  {
    id: "6",
    taskName: "PM Do the UI of the new e-learning dashboard",
    dueDate: new Date("2024-03-10"),
    status: "Not Started",
    priority: "High",
  },
];
