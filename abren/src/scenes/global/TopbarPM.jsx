import React, { useContext, useState, useEffect } from "react";
import { Box, IconButton, useTheme, Menu, MenuItem, Badge, ListItemIcon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const loggedInUser = "John Doe";

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Dummy data for notifications
    const dummyData = [
      {
        userId: "614cfeae8e086a29d842a943",
        projectId: "614d02409e071b3458b08724",
        type: "projectAssigned",
        message: "You have been assigned to a new project 'Kaizen website'.",
        startDate: new Date("2024-03-20"),
        endDate: new Date("2024-03-25"),
        createdAt: new Date("2024-03-18"),
      },
      {
        userId: "614cfeae8e086a29d842a943",
        projectId: "614d02409e071b3458b08725",
        type: "taskAssigned",
        message: "You have a new task 'Update Homepage' assigned in project 'New website'. ",
        startDate: new Date("2024-03-22"),
        endDate: new Date("2024-03-24"),
        createdAt: new Date("2024-03-18"),
      },
      {
        userId: "614cfeae8e086a29d842a944",
        projectId: "614d02409e071b3458b08726",
        type: "approachingDeadline",
        message: "The deadline for project 'Important Project' is approaching.",
        startDate: new Date("2024-03-28"),
        endDate: new Date("2024-03-30"),
        createdAt: new Date("2024-03-19"),
      },
      {
        userId: "614cfeae8e086a29d842a945",
        projectId: "614d02409e071b3458b08727",
        type: "lowResources",
        message: "Low resources detected for the project 'Resource Management'. Act now to replenish resources.",
        startDate: new Date("2024-03-25"),
        endDate: new Date("2024-03-28"),
        createdAt: new Date("2024-03-20"),
      },
      
    ];
    setNotifications(dummyData);
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

  const removeNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: colors.background,
        borderRadius: "20px"
      }}
    >
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
        {/* Implement your search bar here */}
        <Box
          display="flex"
          borderRadius="20px"
          alignContent="center"
          alignItems="center"
          sx={{ margin: "auto" }}
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
          <IconButton onClick={handleNotificationIconClick}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsOutlinedIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleProfileIconClick}>
            <PersonOutlinedIcon />
          </IconButton>
        </Box>

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
          >
            <ListItemIcon>
              <PersonOutlineIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleCloseProfileMenu}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Notification Menu */}
        <Menu
  anchorEl={anchorElNotification}
  open={Boolean(anchorElNotification)}
  onClose={() => setAnchorElNotification(null)}
  PaperProps={{
    sx: {
      width: 320, // Adjust the width as per your requirement
      maxHeight: 300, // Adjust the max height as per your requirement
      overflowY: "auto", // Enable vertical scrolling if necessary
    },
  }}
>
  {notifications.map((notification, index) => {
    const daysUntilDeadline = Math.ceil((notification.endDate - new Date()) / (1000 * 3600 * 24));

    let dateText = '';
    if (notification.type === 'projectAssigned' || notification.type === 'taskAssigned') {
      const diffDays = Math.ceil((notification.startDate - new Date()) / (1000 * 3600 * 24));
      if (diffDays === 0) {
        dateText = 'today';
      } else if (diffDays === 1) {
        dateText = 'tomorrow';
      } else {
        dateText = `${diffDays} day${diffDays > 1 ? 's' : ''} from now`;
      }
    } else if (notification.type === 'approachingDeadline') {
      if (daysUntilDeadline === 0) {
        dateText = 'today';
      } else if (daysUntilDeadline === 1) {
        dateText = 'tomorrow';
      } else {
        dateText = `${daysUntilDeadline} day${daysUntilDeadline > 1 ? 's' : ''} `;
      }
    }

    return (
      <MenuItem key={index} onClick={() => removeNotification(index)}>
        <ListItemIcon>
          <span style={{ fontSize: "20px", color: notification.type === 'lowResources' ? 'red' : colors.primary[110], marginRight: "8px" }}>•</span>
        </ListItemIcon>
        <Box>
          <Typography sx={{ whiteSpace: 'normal', overflowWrap: "break-word" }}>{notification.message}</Typography>
          {dateText && (
            <Typography variant="caption" sx={{ color: colors.grey[300] }}>
              {notification.type === 'approachingDeadline' ? 'Due in: ' : 'Starts '}{dateText}
            </Typography>
          )}
        </Box>
      </MenuItem>
    );
  })}
</Menu>



      </Box>
    </Box>
  );
};

export default Topbar;

