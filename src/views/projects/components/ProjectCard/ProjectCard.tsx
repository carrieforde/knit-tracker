import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Project } from "types";

export const ProjectCard: React.FC<Project> = ({
  name,
  slug,
  currentRowCount = 0,
  maxRowCount,
  currentRepeatCount,
  maxRepeatCount,
}) => (
  <Card sx={{ maxWidth: "100%", width: "350px" }}>
    <CardContent>
      <Typography component="h2" variant="h6">
        {name}
      </Typography>

      <Typography>Current Progress</Typography>
      <Typography variant="body2">
        {currentRowCount} of {maxRowCount} rows
      </Typography>
      {maxRepeatCount > 0 ? (
        <Typography variant="body2">
          {currentRepeatCount} of {maxRepeatCount} repeats
        </Typography>
      ) : null}
    </CardContent>
    <CardActions>
      <Button component={Link} to={slug}>
        View Counters
      </Button>
      <IconButton>
        <EditIcon />
      </IconButton>
    </CardActions>
  </Card>
);
