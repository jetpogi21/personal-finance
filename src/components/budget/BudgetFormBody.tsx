import React from "react";
import { TBudgetFormHook } from "../../hooks/budget/useBudgetForm";
import { Stack, Box, Container, Paper } from "@mui/material";
import BudgetForm from "./BudgetForm";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import Dialog from "../dialog/Dialog";

const BudgetFormBody: React.FC<{
  props: TBudgetFormHook;
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
    importTemplateClick,
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
            <BudgetForm
              budget={mainListObject.budget}
              formInitialValues={formInitialValues}
              formHandlers={formHandlers}
              requiredListObject={requiredListObject}
              handleOpenDialog={handleOpenDialog}
              formError={formError}
              importTemplateClick={importTemplateClick}
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

export default BudgetFormBody;
