import { TextField } from "@mui/material";
import React from "react";

interface textProps {
  width?: string;
  textAlignOnDisplay?: string;
  defaultText: string;
  editMode: boolean;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const editableText = ({
  editMode,
  defaultText,
  width,
  textAlignOnDisplay,
  setValue,
}: textProps) => {
  return (
    <TextField
      hiddenLabel
      defaultValue={defaultText}
      disabled={!editMode}
      variant="standard"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)
      }
      sx={{
        "& .MuiInputBase-input.Mui-disabled": {
          color: "black",
          "-webkit-text-fill-color": "black",
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
