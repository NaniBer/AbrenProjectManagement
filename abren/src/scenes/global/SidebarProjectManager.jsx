import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { profile } from "../../data/mockData";
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

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const initialsArray = profile.map((teamMember) => {
    const initials = `${teamMember.firstname[0]}${teamMember.lastname[0]}`;
    return initials;
  });

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
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          backgroundColor: "lightgray",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer"
                        }}
                      >
                        <span style={{ fontSize: "40px", fontWeight: "bold" ,color: colors.primary[110]}}>{initialsArray}</span>
                      </div>
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
                        Project Manager
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
                    Projects
                  </Typography>
                  <Item
                    title="Project1"
                    to="/project"
                    icon={<AccountTreeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                  >
                    Pages
                  </Typography>
                  <Item
                    title="Kanban"
                    to="/kanbanPM"
                    icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Calendar"
                    to="/calendar"
                    icon={<PersonOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Report"
                    to="/report"
                    icon={<SummarizeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Menu>
            </ProSidebar>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
