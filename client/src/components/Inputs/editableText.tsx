import { TextField } from "@mui/material";
import React from "react";

interface textProps {
  defaultText: string;
  editMode: boolean;
}

const editableText = ({ editMode, defaultText }: textProps) => {
  return (
    <TextField
      hiddenLabel
      defaultValue={defaultText}
      disabled={!editMode}
      variant="standard"
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          color: "black",
          "-webkit-text-fill-color": "black",
          textAlign: "center",
        },
        "& .MuiInput-underline:after": {
          borderBottom: "2px solid black",
        },
      }}
      InputProps={{
        disableUnderline: !editMode,
      }}
    />
  );
};

export default editableText;
