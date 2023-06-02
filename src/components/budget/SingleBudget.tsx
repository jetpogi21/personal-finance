import React from "react";
import { BudgetModel } from "../../interfaces/BudgetInterfaces";
import {
  Link as MUILink,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import {
  formatCurrency,
  getMonthName,
  parseAsValidFloat,
} from "../../utils/utilities";
import {
  countFridaysInMonth,
  getIncomeExpenseAndRowTotals,
  getWeekdayCount,
} from "../../utils/budget";
import { ColumnStack, RowStack } from "../MUI/Stack";
import { TotalIncomeAndExpense } from "../../hooks/budget/useBudgets";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

type SingleBudgetProp = {
  budget: BudgetModel;
  totalIncomeAndExpenses: TotalIncomeAndExpense[] | null;
};

const SingleBudget: React.FC<SingleBudgetProp> = ({
  budget,
  totalIncomeAndExpenses,
}) => {
  const workDayMultiplier = getWeekdayCount(
    budget.budget_month.toString(),
    budget.budget_year.toString()
  );

  const weeklyMultiplier = countFridaysInMonth(
    budget.budget_month.toString(),
    budget.budget_year.toString()
  );

  const { totalExpectedIncome, totalBudgetedExpense, rowTotals } =
    getIncomeExpenseAndRowTotals(
      budget.BudgetItems,
      workDayMultiplier,
      weeklyMultiplier
    );

  const totalIncomeAndExpense = getTotalIncomeAndExpense(
    totalIncomeAndExpenses,
    budget.budget_month,
    budget.budget_year
  );

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      sx={{ height: "100%" }}
      p={2}
      gap={2}
    >
      <BudgetLink budget={budget} />
      <ColumnStack sx={{ "& div": { flex: 1 } }}>
        <Table size="small" sx={{ "& td": { borderBottom: "none", px: 0 } }}>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right">
                <Typography component="span" fontWeight="bold">
                  Budgeted
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="span" fontWeight="bold">
                  Actual
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography component="span" fontWeight="bold">
                  Variance
                </Typography>
              </TableCell>
            </TableRow>
            <BudgetRow
              label="Income"
              value={totalExpectedIncome}
              totalIncomeAndExpense={totalIncomeAndExpense}
            />
            <BudgetRow
              label="Expense"
              value={totalBudgetedExpense}
              totalIncomeAndExpense={totalIncomeAndExpense}
            />
            <BudgetRow
              label="Net Income"
              value={totalExpectedIncome - totalBudgetedExpense}
              totalIncomeAndExpense={totalIncomeAndExpense}
            />
          </TableBody>
        </Table>
      </ColumnStack>
    </Stack>
  );
};

type BudgetLinkProps = {
  budget: BudgetModel;
};

const BudgetLink: React.FC<BudgetLinkProps> = ({ budget }) => (
  <MUILink
    component={Link}
    href={`/budgets/${budget.id}`}
    sx={{
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      color: "inherit",
    }}
  >
    {`${getMonthName(budget.budget_month)} ${budget.budget_year}`}
  </MUILink>
);

type BudgetRowProps = {
  label: string;
  value: number;
  totalIncomeAndExpense?: TotalIncomeAndExpense;
};

const BudgetRow: React.FC<BudgetRowProps> = ({
  label,
  value,
  totalIncomeAndExpense,
}) => {
  const variance = calculateVariance(value, totalIncomeAndExpense, label);
  const icon = getIcon(variance);
  const fontColor = getFontColor(variance, label);

  return (
    <TableRow>
      <TableCell>
        <Typography component="span" fontWeight="bold">
          {label}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{formatCurrency(value)}</Typography>
      </TableCell>
      {!!totalIncomeAndExpense && (
        <>
          <TableCell align="right">
            <Typography>
              {formatCurrency(getTotalValue(totalIncomeAndExpense, label))}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography
              color={fontColor}
              sx={{ position: "relative" }}
              fontWeight="bold"
            >
              {icon} {formatCurrency(variance)}
            </Typography>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

const calculateVariance = (
  value: number,
  totalIncomeAndExpense: any,
  label: string
): number => {
  if (!!totalIncomeAndExpense) {
    const totalValue = getTotalValue(totalIncomeAndExpense, label) as string;
    return (parseAsValidFloat(totalValue) as number) - value;
  }
  return 0;
};

const getIcon = (variance: number): JSX.Element => {
  if (variance > 0) {
    return <GoTriangleUp style={{ position: "relative", top: "2px" }} />;
  }
  return <GoTriangleDown style={{ position: "relative", top: "2px" }} />;
};

const getFontColor = (variance: number, label: string): string => {
  if (variance > 0) {
    return label === "Income" || label === "Net Income"
      ? "success.main"
      : "error.main";
  }
  return label === "Income" || label === "Net Income"
    ? "error.main"
    : "success.main";
};

const getTotalIncomeAndExpense = (
  totalIncomeAndExpenses: TotalIncomeAndExpense[] | null,
  budgetMonth: number,
  budgetYear: number
): TotalIncomeAndExpense | undefined => {
  if (!totalIncomeAndExpenses) return undefined;
  return totalIncomeAndExpenses.find(
    (item) => item.month === budgetMonth && item.year === budgetYear
  );
};

const getTotalValue = (
  totalIncomeAndExpense: TotalIncomeAndExpense,
  label: string
) => {
  switch (label) {
    case "Income":
      return totalIncomeAndExpense.total_income;
    case "Expense":
      return totalIncomeAndExpense.total_expense;
    case "Net Income":
      return totalIncomeAndExpense.net_income;
    default:
      return "0";
  }
};

export default SingleBudget;
