import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router";
import { database } from "services";
import { IProject } from "types";

export type ProjectsProviderContext = IProject[] | null;

export const defaultProjectsProviderContextValue = null;

export const ProjectsContext = createContext<ProjectsProviderContext>(
  defaultProjectsProviderContextValue
);

export const ProjectsProvider: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<IProject[] | null>(null);

  const handleRedirect = useCallback(
    (projectsLength?: number) => {
      if (!projectsLength || projectsLength <= 0) {
        navigate("/add-project");
      }
    },
    [navigate]
  );

  const getProjects = useCallback(
    () => database.getAllProjects(setProjects, handleRedirect),
    [handleRedirect]
  );

  useEffect(() => {
    getProjects();

    return () => {
      setProjects(null);
    };
  }, [getProjects]);

  const memoizedValue = useMemo(() => projects, [projects]);

  return (
    <ProjectsContext.Provider value={memoizedValue}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsContext = () => useContext(ProjectsContext);
