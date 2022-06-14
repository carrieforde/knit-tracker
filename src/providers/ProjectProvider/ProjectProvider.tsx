import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { database } from "services";
import { IProject } from "types";

export type ProjectProviderContext = IProject | null;

export const defaultProjectProviderContextValue: ProjectProviderContext = null;

export const ProjectContext = createContext<ProjectProviderContext>(
  defaultProjectProviderContextValue
);

export const ProjectProvider: React.FC = ({ children }) => {
  const { projectId } = useParams();
  const [project, setProject] = useState<IProject | null>(null);

  const getProject = useCallback(() => {
    if (projectId) {
      database.getProject(projectId, setProject);
    }
  }, [projectId]);

  useEffect(() => {
    getProject();

    return () => {
      setProject(null);
    };
  }, [getProject]);

  const memoizedValue = useMemo(() => project, [project]);

  return (
    <ProjectContext.Provider value={memoizedValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
