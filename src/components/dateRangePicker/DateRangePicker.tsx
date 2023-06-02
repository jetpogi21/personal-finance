import { Popover, TextField, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DateRange,
  RangeKeyDict,
  Range,
  DateRangePicker,
  defaultStaticRanges,
} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ColumnStack, RowStack } from "../MUI/Stack";
import { useField } from "formik";
import { convertDateToYYYYMMDD } from "../../utils/utilities";
import {
  startOfYear,
  endOfDay,
  isSameDay,
  addYears,
  endOfYear,
} from "date-fns";

interface CustomDateRangePickerProps {
  name: string;
  label: string;
  onPopoverClose?: () => void;
}

const CustomDateRangePicker: React.FC<CustomDateRangePickerProps> = ({
  name,
  label,
  onPopoverClose,
}) => {
  const startDate = useField(`start_${name}`);
  const endDate = useField(`end_${name}`);

  const [selectedDateRange, setSelectedDateRange] = useState<Range[]>([
    {
      startDate: startDate[0].value ? new Date(startDate[0].value) : undefined,
      endDate: endDate[0].value ? new Date(endDate[0].value) : undefined,
      key: "selection",
    },
  ]);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleDateRangeChange = (item: RangeKeyDict) => {
    if (item.selection.startDate) {
      const { startDate, endDate } = item.selection;
      const newSelectedDateRange = [
        {
          startDate,
          endDate,
          key: "selection",
        },
      ];

      setSelectedDateRange(newSelectedDateRange);
    }
    //setAnchorEl(null);
  };

  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    onPopoverClose && onPopoverClose();
  };

  const handleReset = () => {
    setSelectedDateRange([
      {
        startDate: undefined, // or null
        endDate: undefined, // or null
        key: "selection",
      },
    ]);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formatSelectedDateRange = () => {
    if (selectedDateRange.length > 0) {
      const { startDate, endDate } = selectedDateRange[0];
      if (startDate && endDate) {
        const startString = startDate.toLocaleDateString() || "";
        const endString = endDate.toLocaleDateString() || "";
        return `${startString} - ${endString}`;
      }
    }
    return "";
  };

  useEffect(() => {
    startDate[2].setValue(
      selectedDateRange[0].startDate
        ? convertDateToYYYYMMDD(selectedDateRange[0].startDate)
        : ""
    );
    endDate[2].setValue(
      selectedDateRange[0].endDate
        ? convertDateToYYYYMMDD(selectedDateRange[0].endDate)
        : ""
    );
  }, [selectedDateRange]);

  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        label={label}
        value={formatSelectedDateRange()}
        onFocus={(e) => e.target.blur()}
        onClick={handleInputClick}
        size="small"
        sx={{ flex: 1 }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <ColumnStack sx={{ bgcolor: "rgb(239, 242, 247)" }} gap={0}>
          <DateRangePicker
            onChange={handleDateRangeChange}
            ranges={selectedDateRange}
            moveRangeOnFirstSelection={false}
            months={2}
            direction="horizontal"
            showMonthAndYearPickers={true}
            staticRanges={[
              ...defaultStaticRanges.filter(
                (item) => item.label !== "Today" && item.label !== "Yesterday"
              ),
              {
                label: "This Year",
                range: () => ({
                  startDate: startOfYear(new Date()),
                  endDate: endOfDay(new Date()),
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(
                      range.startDate as Date,
                      definedRange.startDate as Date
                    ) &&
                    isSameDay(
                      range.endDate as Date,
                      definedRange.endDate as Date
                    )
                  );
                },
              },
              {
                label: "Last Year",
                range: () => ({
                  startDate: startOfYear(addYears(new Date(), -1)),
                  endDate: endOfYear(addYears(new Date(), -1)),
                }),
                isSelected(range) {
                  const definedRange = this.range();
                  return (
                    isSameDay(
                      range.startDate as Date,
                      definedRange.startDate as Date
                    ) &&
                    isSameDay(
                      range.endDate as Date,
                      definedRange.endDate as Date
                    )
                  );
                },
              },
            ]}
          />
          <RowStack gap={1} sx={{ m: 1, justifyContent: "flex-end" }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              sx={{
                boxShadow: 1,
              }}
              onClick={handleClosePopover}
            >
              Apply
            </Button>
            <Button
              size="small"
              variant="muted"
              sx={{
                boxShadow: 1,
              }}
              onClick={handleReset}
            >
              Clear
            </Button>
          </RowStack>
        </ColumnStack>
      </Popover>
    </Box>
  );
};

export default CustomDateRangePicker;
