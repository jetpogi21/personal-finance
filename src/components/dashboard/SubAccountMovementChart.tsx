import React, { useState, useEffect } from "react";
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
  Line,
  LineChart,
} from "recharts";
import { ColumnStack, RowStack } from "../MUI/Stack";
import { Box, Paper, Skeleton, Typography } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { blue } from "@mui/material/colors";
import AccountSelection from "./AccountSelection";
import LoadingSpinner from "../loadingSpinner/LoadingSpinner";
import { ChartStates } from "./Dashboard";
import usePromiseAll from "../../hooks/usePromiseAll";
import { BalanceMovementResult } from "../../interfaces/DashboardInterface";
import { SubAccountTitleModel } from "../../interfaces/SubAccountTitleInterfaces";
import {
  convertDateToYYYYMMDD,
  convertStringToLocaleString,
  parseAsValidFloat,
} from "../../utils/utilities";

interface DataItem {
  date: string;
  amount: string;
}

function fillMissingDates(data: DataItem[]) {
  // Sort the data array by date in ascending order
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Calculate the running balance
  let runningBalance = 0;
  let chartData = [];

  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i];
    const currentDate = new Date(currentItem.date);
    const currentAmount = parseAsValidFloat(currentItem.amount);

    // Calculate the running balance based on the previous date's running balance
    runningBalance += currentAmount as number;

    chartData.push({
      date: convertStringToLocaleString(convertDateToYYYYMMDD(currentDate)),
      amount: runningBalance,
    });

    if (i < data.length - 1) {
      // Fill in missing dates
      const nextDate = new Date(data[i + 1].date);
      const daysDiff = Math.round(
        (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff > 1) {
        for (let j = 1; j < daysDiff; j++) {
          const missingDate = new Date(
            currentDate.getTime() + j * (1000 * 60 * 60 * 24)
          );
          chartData.push({
            date: convertStringToLocaleString(
              missingDate.toISOString().split("T")[0]
            ),
            amount: runningBalance,
          });
        }
      }
    }
  }

  // Remove leading items with 0 amounts until there's only one remaining
  while (chartData.length > 1 && chartData[0].amount === 0) {
    chartData.shift();
  }

  // Convert the amount back to a number in the return value
  return chartData;
}

interface SubAccountMovementChartProps {
  chartStates: ChartStates;
}

interface ChartData {
  name: string;
  amount: number;
}

interface MovementData {
  date: string;
  amount: string;
}

interface SubAccountTitlePromiseResult {
  subAccountTitles: SubAccountTitleModel[];
}

interface MovementPromiseResult {
  movement: MovementData[];
}

const SubAccountMovementChart: React.FC<SubAccountMovementChartProps> = ({
  chartStates,
}) => {
  const [promiseParams, setPromiseParams] = useState<Record<string, string>>({
    start_date: chartStates.start_date as string,
    end_date: chartStates.end_date as string,
    id: "",
  });

  const {
    data: subAccountTitleData,
    loading: subAccountTitleLoading,
    error: subAccountTitleError,
  } = usePromiseAll({
    subAccountTitles: "/sub-account-titles",
  });

  const subAccountTitleResult =
    subAccountTitleData as unknown as SubAccountTitlePromiseResult;

  const {
    data: movementData,
    loading: movementLoading,
    error: movementError,
  } = usePromiseAll(
    {
      movement: "/totals/movement",
    },
    promiseParams
  );

  const MovementResult = movementData as unknown as MovementPromiseResult;

  const handleSubAccountMovementFormSubmit = (values: {
    sub_account_title: string | null;
  }) => {
    if (values.sub_account_title) {
      setPromiseParams({
        ...promiseParams,
        id: values.sub_account_title,
      });
    }
  };

  const data = fillMissingDates(MovementResult.movement || []);

  const formatDate = (date: string) => {
    const [month, day, year] = date.split("/");
    return `${month}/${day}`;
  };

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
    if (subAccountTitleResult.subAccountTitles) {
      setPromiseParams({
        ...promiseParams,
        start_date: chartStates.start_date as string,
        end_date: chartStates.end_date as string,
        id:
          promiseParams.id ||
          subAccountTitleResult.subAccountTitles[0].id.toString(),
      });
    }
  }, [subAccountTitleData, chartStates]);

  return (
    <ColumnStack component={Paper} p={2} pl={0} flex={1}>
      <RowStack py={0} alignItems={"center"} justifyContent={"space-between"}>
        <Typography
          pl={2}
          pr={2}
          textTransform={"uppercase"}
          color="grey.500"
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Sub account movement
        </Typography>
        <Box flex={"0 0 200px"}>
          {subAccountTitleLoading || subAccountTitleError ? (
            <Skeleton />
          ) : (
            <AccountSelection
              handleSubAccountMovementFormSubmit={
                handleSubAccountMovementFormSubmit
              }
              subAccountTitles={subAccountTitleResult.subAccountTitles}
              id={promiseParams.id}
            />
          )}
        </Box>
      </RowStack>
      <ColumnStack flex={1}>
        {movementLoading ? (
          <LoadingSpinner />
        ) : (
          <AutoSizer>
            {({ width, height }) => (
              <LineChart width={width} height={height} data={data}>
                <XAxis dataKey="date" tickFormatter={formatDate} tick={false} />
                <YAxis
                  tickFormatter={tickFormatter}
                  style={{ fontSize: "0.75rem" }}
                />
                <Tooltip
                  //@ts-ignore
                  formatter={(value) => numberFormat.format(value)}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke={blue[500]}
                  dot={false}
                />
              </LineChart>
            )}
          </AutoSizer>
        )}
      </ColumnStack>
    </ColumnStack>
  );
};

export default SubAccountMovementChart;
