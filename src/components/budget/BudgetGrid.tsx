import React from "react";
import {
  TMainListObject,
  TotalIncomeAndExpense,
} from "../../hooks/budget/useBudgets";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Pagination from "../pagination/Pagination";
import SingleBudget from "./SingleBudget";
import { RowStack } from "../MUI/Stack";

type BudgetGripProps = {
  mainListObject: TMainListObject;
  limit: string;
  totalIncomeAndExpenses: TotalIncomeAndExpense[] | null;
};

const BudgetGrid: React.FC<BudgetGripProps> = ({
  mainListObject,
  limit,
  totalIncomeAndExpenses,
}) => {
  const { budgets, gridLoading, recordCount } = mainListObject;

  return (
    <Box py={0} display="flex" flex={1} flexDirection={"column"}>
      {!gridLoading ? (
        <Stack direction="column" gap={2} flex={1}>
          {budgets.length === 0 ? (
            <Typography>There is no data.</Typography>
          ) : (
            <>
              <Grid container columns={12} spacing={2}>
                {budgets.map((budget) => {
                  return (
                    <Grid
                      key={budget.id}
                      item={true}
                      xs={12}
                      sm={6}
                      md={12}
                      lg={6}
                      xl={4}
                      sx={{ fontSize: "0.9rem" }}
                    >
                      <Paper
                        sx={{
                          height: "100%",
                          borderRadius: 1,
                        }}
                        elevation={1}
                      >
                        <SingleBudget
                          budget={budget}
                          totalIncomeAndExpenses={totalIncomeAndExpenses}
                        />
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
              <RowStack mt={"auto"}>
                <Pagination recordCount={recordCount} limit={limit} />
              </RowStack>
            </>
          )}
        </Stack>
      ) : (
        <Typography fontWeight="bold">Loading...</Typography>
      )}
    </Box>
  );
};

export default BudgetGrid;
