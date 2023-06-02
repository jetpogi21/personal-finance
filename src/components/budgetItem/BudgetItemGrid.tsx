import React from "react";
import { TMainListObject } from "../../hooks/budgetItem/useBudgetItems";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Pagination from "../pagination/Pagination";
import SingleBudgetItem from "./SingleBudgetItem";
import { RowStack } from "../MUI/Stack";

type BudgetItemGripProps = {
  mainListObject: TMainListObject;
  limit: string;
};

const BudgetItemGrid: React.FC<BudgetItemGripProps> = ({ mainListObject, limit }) => {
  const { budgetItems, gridLoading, recordCount } = mainListObject;

  return (
    <Box py={0}
      display="flex"
      flex={1}
      flexDirection={"column"}>
      {!gridLoading ? (
        <Stack direction="column" gap={2} flex={1}>
          {budgetItems.length === 0 ? (
            <Typography>There is no data.</Typography>
          ) : (
            <>
              <Grid container columns={12} spacing={2}>
                {budgetItems.map((budgetItem) => {
                  return (
                    <Grid
                      key={budgetItem.id}
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
                        <SingleBudgetItem budgetItem={budgetItem} />
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

export default BudgetItemGrid;
