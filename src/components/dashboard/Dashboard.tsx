import React, { useEffect, useState } from "react";
import { ColumnStack, RowStack } from "../MUI/Stack";
import { Grid, Paper, Skeleton, Typography } from "@mui/material";

import DashboardFilter from "./DashboardFilter";
import ExpenseChart from "./ExpenseChart";
import SubAccountMovementChart from "./SubAccountMovementChart";
import DashboardCards from "./DashboardCards";
import { useRouter } from "next/router";
import {
  convertDateToYYYYMMDD,
  getCurrentMonthBeginningDate,
  isValidDate,
} from "../../utils/utilities";
import { DashboardQuery } from "../../interfaces/DashboardInterface";

export interface ChartStates {
  start_date: string | null;
  end_date: string | null;
}

export interface HandleChartStateChangeProps {
  start_date: string;
  end_date: string;
}

const Dashboard: React.FC = () => {
  const router = useRouter();
  const query = router.query as DashboardQuery;

  const [chartStates, setChartStates] = useState<ChartStates>({
    start_date: null,
    end_date: null,
  });

  const getDefaultStartDate = (): string => {
    return isValidDate(query.start_date)
      ? (query.start_date as string)
      : getCurrentMonthBeginningDate();
  };

  const getDefaultEndDate = (): string => {
    return isValidDate(query.end_date)
      ? (query.end_date as string)
      : convertDateToYYYYMMDD(new Date());
  };

  const handleChartStateChange = ({
    start_date,
    end_date,
  }: HandleChartStateChangeProps) => {
    if (
      start_date !== chartStates.start_date ||
      end_date !== chartStates.end_date
    ) {
      setChartStates({
        start_date: isValidDate(start_date)
          ? start_date
          : getDefaultStartDate(),
        end_date: isValidDate(end_date) ? end_date : getDefaultEndDate(),
      });
    }
  };

  useEffect(() => {
    setChartStates({
      start_date: getDefaultStartDate(),
      end_date: getDefaultEndDate(),
    });
  }, [query]);

  return (
    <ColumnStack flex={1}>
      {chartStates.start_date && (
        <>
          <DashboardFilter
            chartStates={chartStates}
            handleChartStateChange={handleChartStateChange}
          />
          <DashboardCards chartStates={chartStates} />
        </>
      )}
      <Grid container columns={12} spacing={2} flex={{ xs: 0, md: 1 }}>
        <Grid
          item
          xs={12}
          lg={6}
          display={"flex"}
          flexDirection={"row"}
          height={"450px"}
        >
          {chartStates.start_date && <ExpenseChart chartStates={chartStates} />}
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          display={"flex"}
          flexDirection={"row"}
          height={"450px"}
        >
          {chartStates.start_date && (
            <SubAccountMovementChart chartStates={chartStates} />
          )}
        </Grid>
      </Grid>
    </ColumnStack>
  );
};

export default Dashboard;
