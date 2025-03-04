import { TextField } from "@mui/material";
import React from "react";

interface textProps {
  width?: string;
  textAlignOnDisplay?: string;
  defaultText: string;
  editMode: boolean;
}

const editableText = ({
  editMode,
  defaultText,
  width,
  textAlignOnDisplay,
}: textProps) => {
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
          // textAlign: "center",
          textAlign: editMode
            ? "center"
            : textAlignOnDisplay
            ? textAlignOnDisplay
            : "center",
        },
        "& .MuiInput-underline:after": {
          borderBottom: "2px solid black",
        },
        width: width ? width : "10rem",
      }}
      InputProps={{
        disableUnderline: !editMode,
      }}
    />
  );
};

export default editableText;
