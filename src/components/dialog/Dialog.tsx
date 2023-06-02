import MUIDialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import React from "react";

interface DialogProps {
  open: boolean;
  handleCloseDialog: () => void;
  handleFunction: () => void;
  message: string;
}

const Dialog = ({
  open,
  message,
  handleCloseDialog,
  handleFunction,
}: DialogProps) => {
  return (
    <>
      <MUIDialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={() => {
              handleFunction();
              handleCloseDialog();
            }}
            color="error"
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </MUIDialog>
    </>
  );
};

export default Dialog;
