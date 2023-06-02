import React from "react";
import { TMainListObject } from "../../hooks/budgetTemplate/useBudgetTemplates";
import { Box, Stack, Typography } from "@mui/material";
import Pagination from "../pagination/Pagination";
import BudgetTemplateForm from "./BudgetTemplateForm";
import useBudgetTemplateForm from "../../hooks/budgetTemplate/useBudgetTemplateForm";

type BudgetTemplateGridProps = {
  mainListObject: TMainListObject;
  limit: string;
};

const BudgetTemplateGrid: React.FC<BudgetTemplateGridProps> = ({
  mainListObject,
  limit,
}) => {
  const { budgetTemplates, gridLoading, recordCount } = mainListObject;
  const {
    formInitialValues,
    formHandlers,
    requiredListObject,
    dialogObject,
    formError,
  } = useBudgetTemplateForm(budgetTemplates);

  return !gridLoading ? (
    <>
      <BudgetTemplateForm
        budgetTemplates={budgetTemplates}
        formInitialValues={formInitialValues}
        formHandlers={formHandlers}
        requiredListObject={requiredListObject}
        formError={formError}
        dialogObject={dialogObject}
      />
      <Pagination recordCount={recordCount} limit={limit} />
    </>
  ) : (
    <Typography fontWeight="bold">Loading...</Typography>
  );
};

export default BudgetTemplateGrid;

