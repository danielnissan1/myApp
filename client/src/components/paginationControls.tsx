import React from "react";
import { Button } from "@mui/material";
import "./paginationControls.css";
import { colors } from "../consts/colors";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = (props) => {
  return (
    <div className="pagination-controls">
      <Button
        variant="contained"
        onClick={props.handlePreviousPage}
        disabled={props.page === 1}
        sx={{
          backgroundColor: colors.DARK_BABY_PINK,
          "&:hover": { backgroundColor: colors.BABY_PINK },
        }}
      >
        Previous
      </Button>
      <span>
        Page {props.page} of {props.totalPages}
      </span>
      <Button
        variant="contained"
        onClick={props.handleNextPage}
        disabled={props.page === props.totalPages}
        sx={{
          marginLeft: "auto",
          backgroundColor: colors.DARK_BABY_PINK,
          "&:hover": { backgroundColor: colors.BABY_PINK },
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
