import { Formik } from "formik";
import React from "react";
import { RowStack } from "../MUI/Stack";
import CustomDateRangePicker from "../dateRangePicker/DateRangePicker";
import { Button, Paper } from "@mui/material";
import { ChartStates, HandleChartStateChangeProps } from "./Dashboard";
import { convertDateToYYYYMMDD } from "../../utils/utilities";

interface DashboardFilterProps {
  chartStates: ChartStates;
  handleChartStateChange: (props: HandleChartStateChangeProps) => void;
}

const DashboardFilter: React.FC<DashboardFilterProps> = ({
  chartStates,
  handleChartStateChange,
}) => {
  const filterFormInitialValue = {
    start_date: chartStates.start_date,
    end_date: chartStates.end_date,
  };
  const handleFilterFormSubmit = (values: typeof filterFormInitialValue) => {
    handleChartStateChange({
      start_date: values.start_date as string,
      end_date: values.end_date as string,
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={filterFormInitialValue}
      onSubmit={handleFilterFormSubmit}
    >
      {(formik) => {
        return (
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <RowStack
              component={Paper}
              p={2}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <CustomDateRangePicker
                name="date"
                label="Period covered"
                onPopoverClose={() => {
                  formik.handleSubmit();
                }}
              />
            </RowStack>
          </form>
        );
      }}
    </Formik>
  );
};

export default DashboardFilter;
