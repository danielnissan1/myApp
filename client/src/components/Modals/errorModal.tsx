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
import { colors } from "../../consts/colors";

interface modalProps {
  text: string;
  open: boolean;
}

const ErrorModal = ({ text, open }: modalProps) => {
  return (
    <Dialog
      open={open}
      sx={{
        height: "20rem",
        width: "30rem",
      }}
    >
      <DialogTitle
        color={colors.ERROR_RED}
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
        <Typography color={colors.ERROR_RED} fontSize={"h3"}>
          ERROR
        </Typography>
        <Typography mt={"1rem"} color={colors.DARK_TEXT}>
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
            backgroundColor: colors.ERROR_RED,
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
