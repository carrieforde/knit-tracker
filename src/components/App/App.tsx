import { ProjectsProvider } from "providers";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { database } from "services";
import { AddProject, Project, Projects } from "views";

export const App = () => {
  const [dbInitialized, setDBInitialized] = useState(false);

  useEffect(() => {
    if (!dbInitialized) {
      database.openDatabase(setDBInitialized);
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return <>Loading...</>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProjectsProvider>
            <Projects />
          </ProjectsProvider>
        }
      />
      <Route path="add-project" element={<AddProject />} />
      <Route
        path="projects"
        element={
          <ProjectsProvider>
            <Projects />
          </ProjectsProvider>
        }
      />
      <Route path="projects/:projectId" element={<Project />} />
    </Routes>
  );
};
