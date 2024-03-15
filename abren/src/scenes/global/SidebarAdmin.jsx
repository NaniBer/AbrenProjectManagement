import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddCardIcon from "@mui/icons-material/AddCard";
// import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import LogoutIcon from "@mui/icons-material/Logout";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Logo from "../../images/abren2.png";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { logoutSucess } from "../../Actions/authActions";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   const handleLogout = () => {
//     console.log("logout");
//     fetch("/admin/Logout", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//     }).then((response) => {
//       const statusCode = response.status;
//       if (statusCode == 200) {
//         dispatch(logoutSucess());
//         navigate("/login");
//       }
//     });
//   };

  return (
    <Box
    sx={{
      position: "sticky",
      top: 0,
      height: "100vh",
      overflowY: "auto",
      width: isCollapsed ? "90px" : "320px",
      transition: "width 0.3s ease",
    }}
  >
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
              <Box
        sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
    <div style={{ borderRadius: '20px', overflow: 'hidden', marginLeft: '10px' , marginTop : '10px', flex: "1"}}>
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
                <img alt="idk" width="80px" height="80px" src={Logo}></img>

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
                  John Doe
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  System Admin
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Project
            </Typography>
            <Item
              title="Create Project"
              to="/createproject"
              icon={<AddCardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="View Project"
              to="/viewproject"
              icon={<ViewCompactIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              User
            </Typography>
            <Item
              title="Create User"
              to="/createteamaccount"
              icon={<PersonAddIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="View User"
              to="/viewuser"
              icon={<ViewListIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Account
            </Typography> */}
            {/* <Item
              title="Update and Reset"
              to="/updateandreset"
              icon={<RestartAltIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <div >
              {/* <Item
                title="Log Out"
                icon={<LogoutIcon />}
                // selected={selected}
                setSelected={setSelected}
              /> */}
            </div>
          </Box>
        </Menu>
      </ProSidebar>
      </div>
      </Box>
    </Box>
    </Box>

  );
};

export default SidebarAdmin;