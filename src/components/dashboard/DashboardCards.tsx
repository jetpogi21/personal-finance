import { Grid, Paper, Typography, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FaMoneyCheckAlt,
  FaMoneyBillAlt,
  FaBalanceScale,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { AiFillPieChart } from "react-icons/ai";

import {
  formatCurrency,
  formatCurrencyFromString,
  parseAsValidFloat,
} from "../../utils/utilities";
import { RowStack, ColumnStack } from "../MUI/Stack";
import usePromiseAll from "../../hooks/usePromiseAll";
import { ChartStates } from "./Dashboard";
import {
  TotalAssetsAndLiabilitiesResult,
  TotalIncomeAndExpenseResult,
} from "../../interfaces/DashboardInterface";

interface DashboardCardsProps {
  chartStates: ChartStates;
}

interface PromiseAllData {
  al: TotalAssetsAndLiabilitiesResult;
  ie: TotalIncomeAndExpenseResult;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ chartStates }) => {
  const [promiseParams, setPromiseParams] = useState<Record<string, string>>({
    start_date: chartStates.start_date as string,
    end_date: chartStates.end_date as string,
  });

  const { data, loading, error } = usePromiseAll(
    {
      ie: "/totals/ie",
      al: "/totals/al",
    },
    promiseParams
  );

  const result = data as unknown as PromiseAllData;

  const netIncome =
    (parseAsValidFloat(result.ie?.totalIncome) || 0) -
    (parseAsValidFloat(result.ie?.totalExpense) || 0);

  const equity =
    (parseAsValidFloat(result.al?.totalAssets) || 0) -
    (parseAsValidFloat(result.al?.totalLiabilities) || 0);

  //console.log({ data });
  const dashboardData = [
    {
      label: "Total Income",
      color: "#5BC236 ",
      amount: result.ie?.totalIncome || 0,
      icon: <FaMoneyBillAlt />,
    },
    {
      label: "Total Expense",
      color: "#FF4040 ",
      amount: result.ie?.totalExpense || 0,
      icon: <FaMoneyCheckAlt />,
    },
    {
      label: "Net Income",
      color: "#1E90FF ",
      amount: netIncome,
      icon: <FaBalanceScale />,
    },
    {
      label: "Total Assets",
      color: "#FFD700 ",
      amount: result.al?.totalAssets || 0,
      icon: <FaMoneyBillWave />,
    },
    {
      label: "Total Liabilites",
      color: "#FFA500 ",
      amount: result.al?.totalLiabilities || 0,
      icon: <FaCreditCard />,
    },
    {
      label: "Total Equity",
      color: "#2196F3 ",
      amount: equity,
      icon: <AiFillPieChart />,
    },
  ];

  useEffect(() => {
    setPromiseParams({
      start_date: chartStates.start_date as string,
      end_date: chartStates.end_date as string,
    });
  }, [chartStates]);
  return (
    <Grid container columns={12} spacing={2}>
      {dashboardData.map((item) => {
        return (
          <Grid item key={item.label} xs={12} md={6} lg={4}>
            <Paper
              sx={{ px: 4, py: 2, borderBottom: 4, borderColor: item.color }}
            >
              <RowStack justifyContent={"space-between"}>
                <ColumnStack>
                  <Typography
                    color="grey.500"
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                  >
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="black"
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                  >
                    {loading || error ? (
                      <Skeleton />
                    ) : (
                      formatCurrency(item.amount)
                    )}
                  </Typography>
                </ColumnStack>
                <ColumnStack
                  justifyContent={"center"}
                  fontSize={"4rem"}
                  color={item.color}
                >
                  {item.icon}
                </ColumnStack>
              </RowStack>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DashboardCards;
