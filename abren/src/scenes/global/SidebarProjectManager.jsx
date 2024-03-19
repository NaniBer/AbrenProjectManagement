import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { profile } from "../../data/mockData";
import Logo from "../../images/abren2.png";
import { useSelector, useDispatch } from "react-redux";
import { loadProject } from "../../Actions/projectActions";
import Swal from "sweetalert2";

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        if (onClick) {
          onClick();
        }
      }}
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
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [firstName, setFirstName] = useState("");
  const user = useSelector((state) => state.auth.user);
  const projectslist = user.projects;
  const firstNamedata = user.firstname;

  const [projects, setProjects] = useState([]);

  // const initials = (user.firstName && user.lastName) ? `${user.firstName[0]}${user.lastName[0]}` : '';
  const initialsArray = profile.map((teamMember) => {
    const initials = `${user.firstname[0]}${user.lastname[0]}`;
    return initials;
  });
  useEffect(() => {
    console.log(user);
    setProjects(projectslist);
    setFirstName(firstNamedata);
  }, [user]);
  const handleProjectSelect = async (projectId) => {
    // Show loading message
    Swal.fire({
      title: "Loading",
      text: "Fetching project data...",
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
    });

    console.log(projectId);
    await fetch(`/Users/getProject/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        const statusCode = response.status;
        console.log(statusCode);
        if (statusCode === 404) {
          throw new Error("Project not found");
        } else if (statusCode === 403) {
          throw new Error("Unauthorized");
        } else if (statusCode === 500) {
          throw new Error("Failed to fetch project");
        } else if (statusCode == 200) return response.json();
      })
      .then((data) => {
        // Close loading message
        Swal.close();

        // Show success message
        Swal.fire({
          title: "Success",
          text: "Project data fetched successfully!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500, // Close after 1.5 seconds
        });

        dispatch(loadProject(data));
        console.log(data);
      })
      .catch((error) => {
        // Close loading message
        Swal.close();

        // Show error message
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

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
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            marginLeft: "10px",
            marginTop: "10px",
            flex: "1",
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
                    <img alt="idk" width="80px" height="80px" src={Logo}></img>

                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </MenuItem>

              {!isCollapsed && (
                <Box mb="25px">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                /> */}
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        backgroundColor: "lightgray",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "40px",
                          fontWeight: "bold",
                          color: colors.primary[110],
                        }}
                      >
                        {initialsArray}
                      </span>
                    </div>
                  </Box>
                  <Box textAlign="center">
                    <Typography
                      variant="h2"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "10px 0 0 0" }}
                    >
                      {firstName}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                  title="Dashboard"
                  to="/pm/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Projects You Lead
                </Typography>

                {projects.length === 0 ? (
                  <Typography variant="body1" sx={{ m: "0 0 5px 20px" }}>
                    No projects yet! Stay tuned
                  </Typography>
                ) : (
                  projects.map((project, index) => (
                    <Item
                      key={index}
                      title={project.ProjectName}
                      to="/user/project"
                      icon={<AccountTreeOutlinedIcon />}
                      selected={selected}
                      setSelected={setSelected}
                      onClick={() => handleProjectSelect(project._id)}
                    />
                  ))
                )}
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "15px 0 5px 20px" }}
                >
                  Projects You're On
                </Typography>
                <Item
                  title="View Assigned Project"
                  to="/user/viewAssignedProject"
                  icon={<AccountTreeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="View Assigned Task"
                  to="/user/viewAssignedTask"
                  icon={<FormatListBulletedIcon />}
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
                  to="/user/kanban"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Calendar"
                  to="/user/calendar"
                  icon={<PersonOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Report"
                  to="/user/report"
                  icon={<SummarizeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
        */}
              </Box>
            </Menu>
          </ProSidebar>
        </div>
      </Box>
    </Box>
  );
};

export default Sidebar;
