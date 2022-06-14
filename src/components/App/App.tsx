import { ProjectContext, ProjectProvider, ProjectsProvider } from "providers";
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
    <ProjectsProvider>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="add-project" element={<AddProject />} />
        <Route path="projects" element={<Projects />} />
        <Route
          path="projects/:projectId"
          element={
            <ProjectProvider>
              <Project />
            </ProjectProvider>
          }
        />
      </Routes>
    </ProjectsProvider>
  );
};
