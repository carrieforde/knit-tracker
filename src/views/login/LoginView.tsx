import { Typography } from "@mui/material";
import { Banner } from "components";
import { useState } from "react";
import { LoginForm } from "./components";
import { LoginLayout } from "./LoginView.styles";

export const LoginView = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);

  return (
    <LoginLayout component="main">
      {showBanner && (
        <Banner variant="warning" sx={{ position: "absolute", top: "36px" }}>
          <Typography fontWeight={500}>
            Thank you for your interest in Knit Tracker, but we're not able to
            register users at this time.
          </Typography>
        </Banner>
      )}
      <LoginForm
        onCreateAccountAttempt={setShowBanner}
        onLoginAttempt={setShowBanner}
      />
    </LoginLayout>
  );
};
