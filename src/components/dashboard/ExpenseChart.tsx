import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
  Label,
} from "recharts";
import { ColumnStack, RowStack } from "../MUI/Stack";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { blue, grey } from "@mui/material/colors";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { ChartStates } from "./Dashboard";
import usePromiseAll from "../../hooks/usePromiseAll";
import { TotalPerExpenseResult } from "../../interfaces/DashboardInterface";
import { parseAsValidFloat } from "../../utils/utilities";

interface ExpenseChartProps {
  chartStates: ChartStates;
}

interface ChartData {
  name: string;
  amount: number;
}

interface PromiseAllResult {
  expense: TotalPerExpenseResult[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ chartStates }) => {
  const [promiseParams, setPromiseParams] = useState<Record<string, string>>({
    start_date: chartStates.start_date as string,
    end_date: chartStates.end_date as string,
  });

  const { data, loading, error } = usePromiseAll(
    {
      expense: "/totals/expense",
    },
    promiseParams
  );

  const result = data as unknown as PromiseAllResult;

  const chartData: ChartData[] = Array.isArray(result.expense)
    ? result.expense.map((item) => ({
        name: item.SubAccountTitle.sub_account_title,
        amount: parseAsValidFloat(item.amount) as number,
      }))
    : [];

  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const tickFormatter = (value: number) => {
    return numberFormat.format(value);
  };

  useEffect(() => {
    setPromiseParams({
      start_date: chartStates.start_date as string,
      end_date: chartStates.end_date as string,
    });
  }, [chartStates]);

  return (
    <ColumnStack component={Paper} p={2} pl={0} flex={1}>
      <Typography
        pl={4}
        pr={2}
        textTransform={"uppercase"}
        color="grey.500"
        fontWeight={"bold"}
        textAlign={"center"}
      >
        Expense per category
      </Typography>
      <ColumnStack flex={1}>
        {loading || error ? (
          <LoadingSpinner />
        ) : (
          <AutoSizer>
            {({ width, height }) => (
              <BarChart
                data={chartData}
                layout="horizontal"
                width={width}
                height={height}
              >
                <XAxis
                  type="category"
                  dataKey="name"
                  style={{ fontSize: "0.75rem" }}
                />
                <YAxis
                  type="number"
                  dataKey="amount"
                  style={{ fontSize: "0.75rem" }}
                  tickFormatter={tickFormatter}
                />
                <Tooltip
                  //@ts-ignore
                  formatter={(value) => numberFormat.format(value)}
                />
                <Bar dataKey="amount" fill={blue[400]} />
              </BarChart>
            )}
          </AutoSizer>
        )}
      </ColumnStack>
    </ColumnStack>
  );
};

export default ExpenseChart;
