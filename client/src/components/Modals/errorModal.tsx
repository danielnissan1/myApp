import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/HighlightOffSharp";
import React from "react";

interface modalProps {
  text: string;
}

const ErrorModal = ({ text }: modalProps) => {
  return (
    <Dialog open={true} sx={{ height: "20rem", width: "30rem" }}>
      <DialogTitle
        color={"#E95567"}
        sx={{ display: "flex", justifyContent: "center", pb: "0px" }}
      >
        <CancelIcon sx={{ fontSize: "4rem" }} />
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color={"#E95567"}>ERROR</Typography>
        <Typography mt={"1rem"} color={"#3B3A3A"}>
          {text}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#E95567",
            color: "white",
            borderRadius: "1rem",
            width: "5rem",
          }}
        >
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
