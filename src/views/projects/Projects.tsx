import { Layout } from "components/Layout/Layout";
import { useProjects } from "hooks";
import React from "react";
import { AddProjectButton, ProjectCard } from "./components";

export const Projects = () => {
  const { projects } = useProjects();

  if (!projects || !projects.length) {
    return null;
  }

  return (
    <Layout grid>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}

      <AddProjectButton />
    </Layout>
  );
};
