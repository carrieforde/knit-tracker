import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Layout } from "components/Layout/Layout";
import React from "react";
import { Link } from "react-router-dom";
import { getProjectsFromLocalStorage } from "services/localStorage/localStorage";
import { ProjectCard } from "./components/ProjectCard/ProjectCard";

export const Projects = () => {
  const projects = getProjectsFromLocalStorage();

  if (!projects.length) {
    return null;
  }

  return (
    <Layout grid>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}

      <Fab
        sx={{ position: "fixed", bottom: "32px", right: "32px" }}
        color="secondary"
        aria-label="Add Project"
        component={Link}
        to="../add-project"
      >
        <AddIcon />
      </Fab>
    </Layout>
  );
};
