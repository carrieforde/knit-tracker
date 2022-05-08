import { Button, Typography } from "@mui/material";
import { FormBody, Input } from "components";
import React, {
  ChangeEvent,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { FormContainer } from "./LoginForm.styles";

interface LoginFormValues {
  username: string;
  password: string;
}

const defaultLoginFormValues: LoginFormValues = {
  username: "",
  password: "",
};

export type LoginFormProps = {
  onLoginAttempt: React.Dispatch<SetStateAction<boolean>>;
  onCreateAccountAttempt: React.Dispatch<SetStateAction<boolean>>;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onCreateAccountAttempt,
  onLoginAttempt,
}) => {
  const [formValues, setFormValues] = useState<LoginFormValues>(
    defaultLoginFormValues
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setFormValues((s) => ({ ...s, [e.target.name]: e.target.value })),
    []
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onLoginAttempt(true);
  };

  const handleCreateAccount = () => {
    onCreateAccountAttempt(true);
  };

  const handleGuestClick = () => {
    // console.log('guest')
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography component="h1" variant="h6" mb={1} textAlign="center">
        Login to your Knit Tracker Account
      </Typography>

      <FormBody>
        <Input name="username" label="User Name" onChange={handleChange} />
        <Input
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
      </FormBody>

      <Button type="submit" variant="contained">
        Login
      </Button>
      <Button variant="outlined" onClick={handleCreateAccount}>
        Create Account
      </Button>

      <Button component={Link} to="guest/projects" onClick={handleGuestClick}>
        Continue as Guest
      </Button>

      <Typography variant="caption" textAlign="center">
        Continuing as a guest stores your data in the browser, and it will not
        be available across devices.
      </Typography>
    </FormContainer>
  );
};
