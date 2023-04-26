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
  palette: {
    primary: {
      main: "#333333",
    },
    secondary: {
      main: "#DDDDDD",
    },
  },
  typography: {
    fontFamily: ["Roboto Flex", "Noto Sans KR", "sans-serif"].join(","),
  },
});
