import { Button } from "@mui/material";
import { Input } from "components";
import { Form } from "components/Form/Form";
import { kebabCase } from "lodash";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { Counter, Project } from "types";
import { CounterFields } from "../CounterFields/CounterFields";

export type AddNewProjectValues = Omit<Counter, "id"> & {
  name: string;
};

const defaultNewProjectValues: AddNewProjectValues = {
  name: "",
  maxRowCount: 0,
  currentRowCount: 0,
  maxRepeatCount: 0,
  currentRepeatCount: 0,
  rowRepeatLinked: false,
};

function saveProjectToLocalStorage(
  project: AddNewProjectValues & { slug: string }
) {
  // Get existing projects
  const projects: Project[] = localStorage.getItem("projects")
    ? JSON.parse(localStorage.getItem("projects") ?? "")
    : [];

  const updatedProjects = JSON.stringify([...projects, project]);

  return localStorage.setItem("projects", updatedProjects);
}

export const AddProjectForm: React.FC = () => {
  const [formValues, setFormValues] = useState<AddNewProjectValues>(
    defaultNewProjectValues
  );
  const navigate = useNavigate();

  const handleChange = useCallback(
    ({ target: { name, checked, value } }: ChangeEvent<HTMLInputElement>) => {
      const newValue = name === "rowRepeatLinked" ? checked : value;
      setFormValues((s) => ({ ...s, [name]: newValue }));
    },
    []
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveProjectToLocalStorage({
      ...formValues,
      slug: kebabCase(formValues.name),
    });
    navigate("/guest/projects");
  };

  return (
    <Form
      title="Add Project"
      onSubmit={handleSubmit}
      actions={
        <>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </>
      }
    >
      <Input
        name="name"
        value={formValues.name}
        onChange={handleChange}
        label="Project Name"
      />
      <CounterFields values={formValues} onChange={handleChange} />
    </Form>
  );
};
