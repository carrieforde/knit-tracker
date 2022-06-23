import { Layout } from "components/Layout/Layout";
import { useProjects } from "hooks";
import { useEffect } from "react";
import { database } from "services";
import { resetProjects, setProjects, useProjectsState } from "store";
import { AddProjectButton, ProjectCard } from "./components";

export const Projects = () => {
  const { handleAddProjectRedirect } = useProjects();
  const { projects } = useProjectsState();

  useEffect(() => {
    database.getAllProjects(setProjects, handleAddProjectRedirect);

    return () => {
      resetProjects();
    };
  }, [handleAddProjectRedirect]);

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
