import { createTheme } from "@mui/material";

export const globalTheme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          ".main": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      },
    },
  },
});
