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
import { IProject } from "types";

export const ProjectCard: React.FC<IProject> = ({
  name,
  slug,
  counters: [rowCounter, repeatCounter, isLinked],
}) => (
  <Card sx={{ maxWidth: "100%", width: "350px" }}>
    <CardContent>
      <Typography component="h2" variant="h6">
        {name}
      </Typography>

      <Typography>Current Progress</Typography>
      <Typography variant="body2">
        {rowCounter.currentCount} of {rowCounter.maxCount} rows
      </Typography>
      {repeatCounter.maxCount > 0 ? (
        <Typography variant="body2">
          {repeatCounter.currentCount} of {repeatCounter.maxCount} repeats
        </Typography>
      ) : null}
    </CardContent>
    <CardActions>
      <Button component={Link} to={`/projects/${slug}`}>
        View Counters
      </Button>
      <IconButton>
        <EditIcon />
      </IconButton>
    </CardActions>
  </Card>
);
