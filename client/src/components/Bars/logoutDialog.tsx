import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React from "react";

interface IdialogProps {
  onClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isDialogOpen: boolean;
}

const LogoutDialog: React.FC<IdialogProps> = ({ onClose, isDialogOpen }) => {
  const handleLogout = () => {
    //TODO logout in server
  };

  return (
    <React.Fragment>
      <Dialog open={isDialogOpen} onClose={onClose}>
        <DialogContent>
          <DialogContentText marginTop={"5px"}>
            {"Are you sure you want to logout?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onClose}
            sx={{
              color: "rgb(192, 160, 160)",
              borderColor: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "transparent",
                transform: "scale(1.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            autoFocus
            sx={{
              color: "rgb(192, 160, 160)",
              borderColor: "black",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "transparent",
                transform: "scale(1.1)",
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default LogoutDialog;
