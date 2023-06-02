import React from "react";
import { TAccountTitleFormHook } from "../../hooks/accountTitle/useAccountTitleForm";
import { Stack, Box, Container, Paper } from "@mui/material";
import AccountTitleForm from "./AccountTitleForm";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import Dialog from "../dialog/Dialog";

const AccountTitleFormBody: React.FC<{
  props: TAccountTitleFormHook;
  sidebarEnabled: boolean;
}> = ({ props, sidebarEnabled = false }) => {
  const {
    breadcrumbLinks,
    dialogObject,
    formInitialValues,
    formHandlers,
    requiredListObject,
    mainListObject,
    formError,
  } = props;
  const { openDialog, handleCloseDialog, handleOpenDialog } = dialogObject;
  return (
    <Box
      bgcolor="grey.100"
      minHeight={sidebarEnabled ? "100vh" : "calc(100vh - 64px)"}
      py={2}
      display={"flex"}
      flex={1}
    >
      <Container maxWidth="lg">
        <Stack direction="column" spacing={2}>
          <Paper>
            <Breadcrumbs links={breadcrumbLinks} />
            <AccountTitleForm
              accountTitle={mainListObject.accountTitle}
              formInitialValues={formInitialValues}
              formHandlers={formHandlers}
              requiredListObject={requiredListObject}
              handleOpenDialog={handleOpenDialog}
              formError={formError}
            />
          </Paper>
        </Stack>
      </Container>

      <Dialog
        open={openDialog}
        message="Are you sure you want to delete this record?"
        handleCloseDialog={handleCloseDialog}
        handleFunction={formHandlers.handleDelete}
      />
    </Box>
  );
};

export default AccountTitleFormBody;
