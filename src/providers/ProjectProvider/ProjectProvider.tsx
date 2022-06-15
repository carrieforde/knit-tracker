import { noop } from "lodash";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  database,
  updateProject as serviceUpdateProject,
  UpdateType,
} from "services";
import { IProject } from "types";

export type ProjectProviderContext = {
  project: IProject | null;
  updateProject: (project: IProject | null, updateType: UpdateType) => void;
};

export const defaultProjectProviderContextValue: ProjectProviderContext = {
  project: null,
  updateProject: noop,
};

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

  const updateProject = useCallback(
    (project: IProject | null, updateType: UpdateType) => {
      if (!project) {
        console.error("Unable to update project");
        return null;
      }

      const value = serviceUpdateProject(project, updateType);

      database.updateProject(value, setProject);
    },
    []
  );

  useEffect(() => {
    getProject();

    return () => {
      setProject(null);
    };
  }, [getProject]);

  const memoizedValue = useMemo(
    () => ({ project, updateProject }),
    [project, updateProject]
  );

  return (
    <ProjectContext.Provider value={memoizedValue}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
