import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Logo from "../../images/abren2.png";



const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                {/* <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography> */}
                <img
                alt="idk"
                width="80px"
                height="80px"
                src={Logo}
                ></img>
              
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Saron
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  System Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
 <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Form
            </Typography>
            <Item
              title="Create Project"
              to="/createproject"
              icon={<AccountTreeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create User"
              to="/createteamaccount"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              View info
            </Typography>
             <Item
              title="View User"
              to="/viewuser"
              icon={<ViewListIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="View Project"
              to="/team"
              icon={<ViewCompactIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Account
            </Typography>
               <Item
              title="Update and Reset"
              to="/team"
              icon={<RestartAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Log Out"
              to="/team"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
      
         
         

          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarAdmin;