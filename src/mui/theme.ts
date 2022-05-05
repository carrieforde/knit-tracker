import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        fontSize: 18,
      },
    },
  },
});

export { theme };
