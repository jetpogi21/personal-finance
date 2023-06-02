import { SnackbarCloseReason } from "@mui/material";
import { useState, SyntheticEvent } from "react";

type snackBarState = {
  msg: string;
  open: boolean;
  severity?: "success" | "error";
};

export const useSnackbar = () => {
  const [snackBar, setSnackBar] = useState<snackBarState>({
    msg: "",
    open: false,
  });

  const openSnackbar = (
    msg: string,
    severity: "success" | "error" = "success"
  ) => {
    setSnackBar({ ...snackBar, open: true, msg, severity });
  };

  const closeSnackbar = (
    event: Event | SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ ...snackBar, open: false });
  };

  return { snackBar, openSnackbar, closeSnackbar };
};
