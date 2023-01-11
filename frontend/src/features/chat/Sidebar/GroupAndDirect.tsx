import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

type GroupProps = { item: string; message: string };

function GroupAndDirect({ item, message }: GroupProps): JSX.Element {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    > <Avatar
        sx={{
          margin: 2,
        }}
      >
        {item[0]}
      </Avatar>{" "}
      <Box sx={{
        display: "flex",
        flexDirection: "column"
      }}>
     
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "null",
            md: "flex",
            lg: "flex",
            xl: "flex",
          },
          marginBottom: 1,
          fontWeight: 600
        }}
      >
        {item}
        
        
      </Box>
      {message.length > 30 ?  <div>{message.slice(0,30)} ...</div> : <div>{message}</div>}
     
      </Box>
    </Box>
  );
}

export default GroupAndDirect;
