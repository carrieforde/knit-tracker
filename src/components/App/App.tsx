import { Route, Routes } from "react-router";
import { AddProject, Project, Projects } from "views";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="add-project" element={<AddProject />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:projectId" element={<Project />} />
    </Routes>
  );
};
