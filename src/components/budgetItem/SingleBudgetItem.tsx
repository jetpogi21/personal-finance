import React from "react";
import { BudgetItemModel } from "../../interfaces/BudgetItemInterfaces";
import { Link as MUILink, Stack } from "@mui/material";
import Link from "next/link";

type SingleBudgetItemProp = {
  budgetItem: BudgetItemModel;
};

const SingleBudgetItem: React.FC<SingleBudgetItemProp> = ({ budgetItem }) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      sx={{ height: "100%" }}
    >
      <MUILink
        component={Link}
        href={`/budget-items/${budgetItem.id}`}
        sx={{
          fontWeight: "bold",
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
          p: 2,
        }}
      >
        {budgetItem.id}
      </MUILink>
    </Stack>
  );
};

export default SingleBudgetItem;
