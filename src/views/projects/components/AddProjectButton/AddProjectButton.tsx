import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Link } from "react-router-dom";
import { AddButton } from "./AddProjectButton.styles";

export const AddProjectButton = () => (
  <AddButton
    color="secondary"
    aria-label="Add Project"
    component={Link}
    to="../add-project"
  >
    <AddIcon />
  </AddButton>
);
