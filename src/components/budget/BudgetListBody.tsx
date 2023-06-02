import { Box, Button, Paper, Stack } from "@mui/material";
import { TBudgetsHook } from "../../hooks/budget/useBudgets";
import { BsFilter } from "react-icons/bs";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import BudgetFilter from "./BudgetFilter";
import BudgetGrid from "./BudgetGrid";
import BudgetListHeader from "./BudgetListHeader";
import { ColumnStack } from "../MUI/Stack";

const BudgetListBody: React.FC<{
  props: TBudgetsHook;
  sidebarEnabled: boolean;
}> = ({ props, sidebarEnabled = false }) => {
  const {
    sortAndLimitObject,
    requiredListObject,
    mainListObject,
    formikObject,
    toggleObject,
    breadCrumbLinks,
    totalIncomeAndExpenses,
  } = props;

  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        minHeight: sidebarEnabled ? "100vh" : "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "row",
        flex: 1,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} flex={1}>
        <Button
          variant="contained"
          startIcon={<BsFilter />}
          sx={{ m: 2, mb: 0, display: { md: "none" } }}
          size="small"
          onClick={toggleObject.toggleFilterForm}
        >
          Show Filter
        </Button>
        <Stack
          direction="column"
          sx={{
            width: { md: 300 },
            height: { xs: "100%" },
            flexShrink: 0,
            display: {
              xs: toggleObject.isFilterFormShown ? "flex" : "none",
              md: "flex",
            },
            position: { xs: "fixed", md: "static" },
            top: { xs: 0 },
            zIndex: 2,
          }}
        >
          {!requiredListObject.isRequiredListLoading && (
            <BudgetFilter
              toggleFilterForm={toggleObject.toggleFilterForm}
              formikObject={formikObject}
              requiredListObject={requiredListObject}
            />
          )}
        </Stack>
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            display: {
              xs: toggleObject.isFilterFormShown ? "none" : "flex",
              md: "flex",
            },
          }}
        >
          <Paper
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Stack direction="column" flex={1}>
              <Breadcrumbs links={breadCrumbLinks} />
              <ColumnStack sx={{ p: 2, flex: 1 }}>
                <Stack direction="row" width={"100%"} alignItems="center">
                  <BudgetListHeader sortAndLimitObject={sortAndLimitObject} />
                </Stack>
                <Stack
                  direction="column"
                  gap={2}
                  alignItems={"flex-stretch"}
                  sx={{ mt: 2, flex: 1 }}
                >
                  <BudgetGrid
                    mainListObject={mainListObject}
                    limit={sortAndLimitObject.limit}
                    totalIncomeAndExpenses={totalIncomeAndExpenses}
                  />
                </Stack>
              </ColumnStack>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default BudgetListBody;
