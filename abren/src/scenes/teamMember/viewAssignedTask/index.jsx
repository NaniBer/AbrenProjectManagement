import React, { useState } from "react";
import TaskListBoard from "../viewAssignedTask/board";
import TaskListList from "../viewAssignedTask/list";
import { Button, Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
// import AddIcon from '@mui/icons-material/Add';

function Index() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [view, setView] = useState("board"); // Initially set to board view

  const toggleView = () => {
    setView((prevView) => (prevView === "board" ? "list" : "board")); // Toggle between board and list view
  };

  return (
    <Box m="20px">
      <div>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header
            title="View Assigned Task"
            subtitle="Shows all the tasks your are assigned to"
          />
          <Button
            variant="outlined"
            onClick={toggleView}
            style={{
              backgroundColor: colors.primary[400],
              color: theme.palette.common.white,
              fontSize: "12px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            {view === "board" ? "Switch to List View" : "Switch to Board View"}
          </Button>
        </Box>

        {view === "board" ? <TaskListBoard /> : <TaskListList />}
      </div>
    </Box>
  );
}

export default Index;
