import { useEffect, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import Swal from "sweetalert2";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { dummyProjectData } from "../../../data/mockData";
import { PMtodolost } from "../../../data/mockData";
import { assignedTask } from "../../../data/mockData";
import { useSelector } from "react-redux";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [assignedTask, setAssignedTask] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); // State to manage visibility of FullCalendar
  const user = useSelector((state) => state.auth.user);
  const project = useSelector((state) => state.auth.user.projects);
  const userid = user._id;
  // console.log(project);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userid);
        const response = await fetch(`/Users/CalendarData/${userid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // console.log(data);
        const { tasks, projects, todos } = data;

        // Assign fetched data to state variables
        setAssignedTask(tasks);
        setProjectData(projects);
        setTodoList(todos);
        // console.log(todos);
        const combinedEvents = [
          ...projects.map((project) => ({
            id: project._id,
            title: project.ProjectName,
            start: project.StartDate,
            end: project.EndDate,
            allDay: true,
            type: "Project Event",
          })),
          ...todos.map((todo) => ({
            id: todo._id,
            title: todo.TodoName,
            end: todo.Date, // Assuming todo has a 'DueDate' property
            allDay: true,
            type: "Personal To-Do",
          })),
          ...tasks.map((task) => ({
            id: task._id,
            title: task.TaskName,
            start: task.StartDate,
            end: task.DueDate,
            allDay: true,
            type: "Project Task",
          })),
        ];
        console.log(combinedEvents);

        // Set currentEvents state with combined events
        setCurrentEvents(combinedEvents);
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch events data");
      }
    };

    fetchData();
  }, []);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  // const handleEventClick = (selected) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event '${selected.event.title}'`
  //     )
  //   ) {
  //     selected.event.remove();
  //   }
  const handleEventClick = (selected) => {
    // Close the FullCalendar component when the event is clicked
    setIsCalendarVisible(false);

    // Extract necessary information from the event
    const { title, start, end, type } = selected.event;
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const formattedStart = start.toLocaleDateString("en-US", options);
    const formattedEnd = end.toLocaleDateString("en-US", options);

    Swal.fire({
      title: title,
      html: `
        <b>Start:</b> ${formattedStart}<br>
        <b>End:</b> ${formattedEnd}
      `,
      icon: "info",
      confirmButtonText: "Close",
    }).then(() => {
      // Set the FullCalendar component to be visible again after closing the Swal
      setIsCalendarVisible(true);
    });
  };
  const eventListClicked = (event) => {
    const { title, start, end, type } = event;
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const endDateObject = new Date(end);
    console.log(event);
    const formattedEnd = endDateObject.toLocaleDateString("en-US", options);
    if (start) {
      const startDateObject = new Date(start);
      const formattedStart = startDateObject.toLocaleDateString(
        "en-US",
        options
      );
      Swal.fire({
        title: title,
        html: `
         ${type}<br>
    <b>Start Date:</b> ${formattedStart}<br>
    <b>Due Date:</b> ${formattedEnd}
      `,
        icon: "info",
        confirmButtonText: "Close",
      });
    } else {
      Swal.fire({
        title: title,
        html: `
         ${type}<br>
        <b>Due Date:</b> ${formattedEnd}
      `,
        icon: "info",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
          sx={{
            maxHeight: "75vh", // Maximum height of the sidebar
            overflowY: currentEvents.length > 3 ? "auto" : "initial", // Enable overflow-y auto when content exceeds 3 items
          }}
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => eventListClicked(event)}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              // timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true} // Show all events for each day
            dayMaxEventRows={true} // Show all events without collapsing
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              ...projectData.map((project) => ({
                id: project.ProjectName,
                title: project.ProjectName,
                start: project.StartDate,
                end: project.EndDate,
                allDay: true,
                type: "Project Event",
              })),
              ...todoList.map((task) => ({
                id: task.id,
                title: task.TodoName,
                end: task.Date, // Assuming todo has a 'DueDate' property
                allDay: true,
                type: "Personal To-Do",
              })),
              // Add assignedTask data as initial events
              ...assignedTask.map((task) => ({
                id: task.TaskName,
                title: task.TaskName,
                start: task.StartDate,
                end: task.EndDate,
                allDay: true,
                type: "Project Task",
              })),
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
