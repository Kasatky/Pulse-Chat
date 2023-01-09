import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { io, Socket } from "socket.io-client";
import useSocket from "../Hooks/useSocket";

function ModalUserWindow(): JSX.Element {
  const socket: Socket = useMemo(
    () => io(window.location.origin, { withCredentials: true }),
    []
  );
  const { user } = useSocket(socket);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: 500,
    borderRadius: 10,
    display: "flex",
    // justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: 5,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  return (
    <div>
      <Button sx={{ color: "black" }} onClick={handleOpen}>
        Open modal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              sx={{
                height: 100,
                width: 100,
                borderRadius: "50%",
                backgroundColor: "#4A95D6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {user?.name[0]}
            </Box>
            <>
              <TextField sx={{marginTop: 5, marginBottom: 5}} fullWidth label="Nickname" id="fullWidth" value={user?.name} />
              <TextField fullWidth label="Bio" id="fullWidth" />
              <Button sx={{marginTop: 5, marginBottom: 5}} variant="contained">Contained</Button>
              </>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalUserWindow;
