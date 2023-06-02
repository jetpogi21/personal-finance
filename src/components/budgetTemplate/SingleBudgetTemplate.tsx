import React from "react";
import { BudgetTemplateModel } from "../../interfaces/BudgetTemplateInterfaces";
import { Link as MUILink, Stack } from "@mui/material";
import Link from "next/link";

type SingleBudgetTemplateProp = {
  budgetTemplate: BudgetTemplateModel;
};

const SingleBudgetTemplate: React.FC<SingleBudgetTemplateProp> = ({ budgetTemplate }) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      sx={{ height: "100%" }}
    >
      <MUILink
  component={Link}
  href={`/budget-templates/${budgetTemplate.id}`}
  sx={{
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit",
    p: 2,
  }}
>
  {budgetTemplate.id}
</MUILink>
    </Stack>
  );
};

export default SingleBudgetTemplate;
