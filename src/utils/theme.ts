import { blueGrey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Declare a custom type for your theme
declare module "@mui/material/styles" {
  interface TypeText {
    hover: React.CSSProperties["color"];
  }
}
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    muted: true;
  }
}

const theme = createTheme({
  palette: {
    text: {
      hover: "#ffffff",
    },
  },
  typography: {
    fontSize: 12,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: "muted",
          },
          style: {
            backgroundColor: "white",
            textTransform: "none",
            color: blueGrey[500],
            "&:hover": {
              backgroundColor: "white",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          fontSize: "0.9rem",
        },
      },
    },
  },
});

export default theme;
