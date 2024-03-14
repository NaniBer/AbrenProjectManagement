import React, { useState, useEffect } from "react";
import { Box, IconButton, useTheme, Menu, MenuItem, Badge, ListItemIcon, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { DashboardTMdata, assignedTask, dummyProjectData } from "../../data/mockData"; // Import your dummy data

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [notificationTasks, setNotificationTasks] = useState([]);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [tasks, setTasks] = useState(DashboardTMdata);
  
  const loggedInUser = "John Doe";

  useEffect(() => {
    const today = new Date();
    const nearingDeadlineTasks = tasks.filter(task => {
      const daysLeft = Math.ceil((new Date(task.dueDate) - today) / (1000 * 60 * 60 * 24));
      return daysLeft === 1 || daysLeft === 0; // Include tasks due today (daysLeft === 0)
    });
    const notificationTasks = nearingDeadlineTasks.map(task => ({
      type: "task",
      name: task.taskName,
      daysLeft: (new Date(task.dueDate)).setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0) ? "Due Today" : 1, // Set daysLeft to "Due Today" if task is due today
      isUrgent: task.priority === "High" // Check if task is high priority
    }));
    setNotificationTasks(notificationTasks);
  }, [tasks]);
  
  

  useEffect(() => {
    const today = new Date();
    const nearingDeadlineProjects = dummyProjectData.filter(project => new Date(project.endDate) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)); // Within a week
    const notificationProjects = nearingDeadlineProjects.map(project => ({
      type: "project",
      name: project.name,
      daysLeft: Math.ceil((new Date(project.endDate) - today) / (1000 * 60 * 60 * 24)), // Calculate days left
      // isUrgent: project.priority === "High" // Check if project is high priority
    }));
    setNotificationTasks(prevState => [...prevState, ...notificationProjects]);
  }, []);

  useEffect(() => {
    const today = new Date();
    const nearingDeadlineTasks = assignedTask.filter(task => new Date(task.endDate) <= new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)); // Within a week
    const notificationAssignedTasks = nearingDeadlineTasks.map(task => ({
      type: "assignedTask",
      name: task.taskName,
      daysLeft: Math.ceil((new Date(task.endDate) - today) / (1000 * 60 * 60 * 24)), // Calculate days left
      isUrgent: task.priority === "High" // Check if task is high priority
    }));
    setNotificationTasks(prevState => [...prevState, ...notificationAssignedTasks]);
  }, []);

  const handleProfileIconClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleNotificationIconClick = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = (index) => {
    // Create a new array excluding the clicked notification
    const updatedNotificationTasks = [...notificationTasks];
    updatedNotificationTasks.splice(index, 1);
    // Update the notificationTasks state with the new array
    setNotificationTasks(updatedNotificationTasks);
    // Close the notification menu
    setAnchorElNotification(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        borderRadius="20px" // Increase the border radius to make it rounder
        // width="500px" // Adjust the width of the search bar
        sx={{ margin: "auto" }} // Center the search bar horizontally
      >
         <Box display="flex" alignItems="center">
        <Typography variant="h3" component="span" mr={1}>
          Welcome, <Typography component="span" variant="h3" sx={{color:colors.greenAccent[400]}}>{loggedInUser}</Typography>
        </Typography>
      </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton id="notification-icon" onClick={handleNotificationIconClick}>
          <Badge badgeContent={notificationTasks.length} color="error">
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleProfileIconClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Notification Menu */}
      <Menu
        anchorEl={anchorElNotification}
        open={Boolean(anchorElNotification)}
        onClose={handleCloseNotificationMenu}
        PaperProps={{
          sx: {
            width: "280px", // narrower width
            maxHeight: "400px", // taller height
            overflowY: "auto",
            padding: "8px 0",
            // backgroundColor: colors.primary[400]
          },
        }}
      >
        {notificationTasks.map((task, index) => (
          <Box key={index}>
           <MenuItem
            onClick={() => handleCloseNotificationMenu(index)}
            component={Link}
            to={task.type === "project" ? "/viewAssignedProject" : task.type === "assignedTask" ? "/viewAssignedTask" : "/kanban"}  sx={{ whiteSpace: 'normal' }}
          >  
    {/* <MenuItem onClick={handleCloseNotificationMenu} component={Link} to={task.type === "project" ? "/viewAssignedProject" : task.type === "assignedTask" ? "/viewAssignedTask" : "/kanban"} sx={{ whiteSpace: 'normal' }}> */}
              <ListItemIcon>
                <span style={{ fontSize: "26px", color: task.isUrgent ? 'red' : (task.type === "project" ? colors.primary[110] : colors.greenAccent[500]) }}>&#8226;</span>
              </ListItemIcon>
              <Box sx={{ flex: 1, ml: -1 }}>
                <div>{task.name}</div>
                <div style={{ color: colors.grey[500], fontSize: '12px' }}>
                {task.type === "project"
                  ? task.daysLeft === 0
                    ? "Due Today"
                    : task.daysLeft === 1
                      ? "1 day left"
                      : `${task.daysLeft} days left`
                  : task.daysLeft === 0
                    ? "Due Today"
                    : `${task.daysLeft}  `
                    }
               </div>
              </Box>
            </MenuItem>
            {index !== notificationTasks.length - 1 && <Box sx={{ borderBottom: `1px solid ${colors.grey[500]}` }} />}
          </Box>
        ))}
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorElProfile}
        open={Boolean(anchorElProfile)}
        onClose={handleCloseProfileMenu}
      >
        <MenuItem
          component={Link}
          to="/updateandreset"
          onClick={handleCloseProfileMenu}
          sx={{
            display: "flex",
            alignItems: "center",
            color: colors.grey[100], // Set the text color
            '&:hover': {
              backgroundColor: colors.primary[200], // Change background color on hover
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
            <PersonOutlineIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleCloseProfileMenu}
          sx={{
            display: "flex",
            alignItems: "center",
            color: colors.grey[100], // Set the text color
            '&:hover': {
              backgroundColor: colors.primary[200], // Change background color on hover
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
