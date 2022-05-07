import { Button } from "@mui/material";
import { Input } from "components";
import { Form } from "components/Form/Form";
import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { addProject } from "services/indexedDb/indexedDb";
import { saveProjectToLocalStorage } from "services/localStorage/localStorage";
import { CounterFields } from "../CounterFields/CounterFields";
import {
  AddProjectFormValues,
  defaultAddProjectValues,
  getMappedProjectValues,
} from "./AddProjectForm.helpers";

export const AddProjectForm: React.FC = () => {
  const [formValues, setFormValues] = useState<AddProjectFormValues>(
    defaultAddProjectValues
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

    const mapped = getMappedProjectValues(formValues);

    saveProjectToLocalStorage(mapped);
    addProject(mapped);
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
