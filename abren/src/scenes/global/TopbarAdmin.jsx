import React, { useState } from "react";
import { Box, IconButton, useTheme, Menu, MenuItem ,ListItemIcon } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="20px" // Increase the border radius to make it rounder
        width="500px" // Adjust the width of the search bar
        sx={{ margin: "auto" }} // Center the search bar horizontally
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          inputProps={{ style: { borderRadius: "20px" } }} // Round the input field
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
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
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton onClick={handleProfileIconClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      {/* Profile Menu */}
      <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
  
>
  <MenuItem
    component={Link}
    to="/updateandreset"
    onClick={handleCloseMenu}
    
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
    onClick={handleCloseMenu}
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
