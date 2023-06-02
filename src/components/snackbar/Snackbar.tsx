import { ForwardedRef, SyntheticEvent, forwardRef, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/system";
import { Snackbar as MUISnackbar } from "@mui/material";
import { useGlobalContext } from "../../contexts/Global";

const Alert = forwardRef(function Alert(
  props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar() {
  const { snackBar, closeSnackbar } = useGlobalContext();

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <MUISnackbar
        open={snackBar.open}
        autoHideDuration={2000}
        onClose={closeSnackbar}
      >
        {/* @ts-ignore */}
        <Alert
          onClose={closeSnackbar}
          severity={snackBar.severity}
          sx={{ width: "100%" }}
        >
          {snackBar.msg}
        </Alert>
      </MUISnackbar>
    </Stack>
  );
}
