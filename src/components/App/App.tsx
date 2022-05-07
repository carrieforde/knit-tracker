import { Route, Routes } from "react-router";
import { AddProject, LoginView, Project, Projects } from "views";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginView />} />
      <Route path="guest">
        <Route path="add-project" element={<AddProject />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:projectId" element={<Project />} />
      </Route>
    </Routes>
  );
};
