import { Box } from "@mui/system";
import React from "react";
import { Button, Typography } from "@mui/material";
import { logoutThunk } from "../../auth/authSlice";


import SearchView from './SearchView';
import { useAppDispatch } from '../../../store';
import ModalUserWindow from '../ModalUserWindow/ModalUserWindow';
import GroupAndDirect from "./GroupAndDirect";

function Sidebar(): JSX.Element {
  const dispatch = useAppDispatch();
  const handleLogout = (): void => {
    dispatch(logoutThunk());
  };
  const groups = ["Billionares club", "Bates"];
  const directs = ["Steve Jobs", "Bill Gates"];
  const messages = ["Hi, girls", "Nice job", 'Im glad to see you, sit down please', 'i need your ...'];
  return (

    <Box sx={{ backgroundColor: "#212329", height: "100" }}>
      <Box sx={{
        margin: 4,
        fontSize: 5,
      }}>
        <Typography variant="h4" align="left" sx={{ ml: "1vw", mb: "3vh", color: "white" }}>
          Messages
        </Typography>
      </Box>

      <Box
        sx={{
          width: 400,
          color: "white",

          opacity: 0.8,
          mb: "40vh",
        }}
      >

        <Box ><SearchView /></Box>
        
        <>

          <Typography align="left" sx={{ ml: "1vw" }}>

            GROUPS
          </Typography>
          <Box
            sx={{
              width: '100%',
              // height: 130,
              display: "flex",
              flexDirection: "column",
              mb: 10,
            }}
          >
            {groups.map((el, index) => (
              <GroupAndDirect item={el} message = {messages[index]} />
            ))}
          </Box>
        </>

        <>

          <Typography align="left" sx={{ ml: "1vw", mb: "3vh" }}>

            DIRECT
          </Typography>

          <Box
            sx={{
              width: '100%',
              height: 30,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {directs.map((el,index) => (
              <GroupAndDirect item={el} message = {messages[index+2]} />
            ))}
          </Box>
        </>
      </Box>
      <ModalUserWindow/>
      <Button
        sx={{
          width: "100%",
          height: "3vh",
        }}
        disableElevation
        onClick={handleLogout}
        variant='contained'
      >
        Logout...
      </Button>
    </Box>
  );
}

export default Sidebar;
