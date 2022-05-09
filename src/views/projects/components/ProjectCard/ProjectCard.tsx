import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Progress, StatusChip } from "components";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { IProject } from "types";

export const ProjectCard: React.FC<IProject> = ({
  name,
  slug,
  timestamps,
  status,
  progress,
}) => (
  <Card sx={{ maxWidth: "100%", width: "350px" }}>
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        mb={2}
      >
        <Typography component="h2" variant="h6" lineHeight={1.2} mr={1}>
          {name}
        </Typography>
        <StatusChip status={status} />
      </Box>

      <Progress progress={progress} />

      {timestamps?.started ? (
        <Typography>
          Started: {dayjs(timestamps.started).format("MM/DD/YYYY")}
        </Typography>
      ) : null}

      {timestamps?.completed ? (
        <Typography>
          Completed: {dayjs(timestamps.completed).format("MM/DD/YYYY")}
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
