import { useEffect, useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
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
  const user = useSelector((state) => state.auth.user);
  const userid = user._id;
  // console.log("Hello");
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(userid);
        const response = await fetch(`/Users/getEvents/${userid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data);
        const { tasks, projects, todos } = data;

        // Assign fetched data to state variables
        setAssignedTask(tasks);
        setProjectData(projects);
        setTodoList(todos);
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

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
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
                }}
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
              timeGridPlugin,
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
            dayMaxEvents={true}
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
              })),
              ...todoList.map((task) => ({
                id: task.id,
                title: task.TodoName,
                end: task.date,
                allDay: true,
              })),
              // Add assignedTask data as initial events
              ...assignedTask.map((task) => ({
                id: task.TaskName,
                title: task.TaskName,
                start: task.StartDate,
                end: task.EndDate,
                allDay: true,
              })),
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
