import { FormControlLabel, Switch } from "@mui/material";
import { Input } from "components";
import React, { ChangeEvent } from "react";
import { AddProjectFormValues } from "../AddProjectForm/AddProjectForm.helpers";

export type CounterFieldsProps = {
  values: AddProjectFormValues;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CounterFields: React.FC<CounterFieldsProps> = ({
  values,
  onChange,
}) => (
  <>
    <Input
      type="number"
      name="maxRowCount"
      label="Max Row Count"
      onChange={onChange}
      value={values.maxRowCount}
    />
    <Input
      type="number"
      name="currentRowCount"
      label="Current Row Count"
      onChange={onChange}
      value={values.currentRowCount}
    />
    <Input
      type="number"
      name="maxRepeatCount"
      label="Max Repeat Count"
      onChange={onChange}
      value={values.maxRepeatCount}
    />
    <Input
      type="number"
      name="currentRepeatCount"
      label="Current Repeat Count"
      onChange={onChange}
      value={values.currentRepeatCount}
    />
    <FormControlLabel
      label="Link row & repeat?"
      control={
        <Switch name="isLinked" value={values.isLinked} onChange={onChange} />
      }
    />
  </>
);
