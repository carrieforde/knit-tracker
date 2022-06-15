import { Layout } from "components/Layout/Layout";
import { useProjectsContext } from "providers";
import React from "react";
import { AddProjectButton, ProjectCard } from "./components";

export const Projects = () => {
  const projects = useProjectsContext();

  if (!projects || !projects.length) {
    return null;
  }

  return (
    <Layout testId="projects" grid>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}

      <AddProjectButton />
    </Layout>
  );
};
