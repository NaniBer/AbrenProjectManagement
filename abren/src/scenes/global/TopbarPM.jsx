import React, { useContext, useState, useEffect } from "react";
import { Box, IconButton, useTheme, Menu, MenuItem, Badge, ListItemIcon, Typography } from "@mui/material";
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

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const loggedInUser = "John Doe";

  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: 1,
      projectname: "Kaizen website",
      description: "kaizen is a tech company ",
      projectmanager: "saronbisrat.kaizen",
      status: "active",
      startDate: '2024-03-14',
    },
    {
      id: 2,
      projectname: "New website",
      description: "kaizen is a tech company ",
      projectmanager: "saronbisrat.kaizen",
      status: "active",
      startDate: '2024-03-18',
    },
  ]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const calculateNotificationCount = () => {
      // Calculate notification count based on project assignment to a project manager
      const projectsWithNotification = projects.filter(project => project.projectmanager !== "" && isNotificationRequired(project.startDate));
      setNotificationCount(projectsWithNotification.length);
    };

    calculateNotificationCount();

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [projects]);

  const isNotificationRequired = (startDate) => {
    const today = new Date();
    const projectStartDate = new Date(startDate);
    // Calculate the difference in milliseconds between today and the project start date
    const differenceInTime = projectStartDate.getTime() - today.getTime();
    // Calculate the difference in days
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    // If the project start date is within the next 7 days, return true for notification requirement
    return differenceInDays <= 7 && differenceInDays >= 0;
  };

  const handleProfileIconClick = (event) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElProfile(null);
  };

  const handleNotificationIconClick = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000, // Ensure topbar is above other content
        backgroundColor: isScrolled ? colors.primary[400] : "transparent", // Change background color when scrolled
        transition: "background-color 0.3s ease", // Smooth transition for background color change
        borderRadius: "20px"
      }}
    >
      <Box display="flex" justifyContent="space-between" p={2}>
        {/* SEARCH BAR */}
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
            <Badge badgeContent={notificationCount} color="error">
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
            sx={{
              display: "flex",
              alignItems: "center",
              color: colors.grey[100],
              '&:hover': {
                backgroundColor: colors.primary[200],
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
              color: colors.grey[100],
              '&:hover': {
                backgroundColor: colors.primary[200],
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
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
        >
          {projects.map((project, index) => (
            <MenuItem
              key={index}
              component={Link}
              to="/viewproject"
              onClick={() => {
                // Decrease notification count when menu item is clicked
                setNotificationCount(prevCount => prevCount - 1);
                setAnchorElNotification(null);
              }}
              sx={{ whiteSpace: 'normal' }}
            >
              <ListItemIcon>
                <span style={{ fontSize: "26px", color: colors.primary[110] }}>&#8226;</span>
              </ListItemIcon>
              <Typography>{project.projectname}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;
