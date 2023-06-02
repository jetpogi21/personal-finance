import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import React from "react";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { SortOptions } from "../../interfaces/GeneralInterfaces";
import SortMenu from "../sortMenu/SortMenu";

type BudgetTemplateListHeaderProps = {
  sortAndLimitObject: {
    limit: string;
    sortOptions: SortOptions;
    handleBudgetTemplateSort: (name: string) => void;
    handleBudgetTemplateLimitChange: (event: SelectChangeEvent<string>) => void;
  };
  renderAddNew?: boolean;
};

const BudgetTemplateListHeader: React.FC<BudgetTemplateListHeaderProps> = ({
  sortAndLimitObject,
  renderAddNew = true,
}) => {
  const { limit, handleBudgetTemplateLimitChange, sortOptions, handleBudgetTemplateSort } =
    sortAndLimitObject;

  return (
    <>
      {renderAddNew && (
        <Button variant="contained" size="small">
          <Link
            href="budget-templates/new"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Add New
          </Link>
        </Button>
      )}
      <Stack direction="row" ml="auto" gap={2}>
        <Box width="75px">
          <FormControl
            fullWidth={true}
            sx={{
              "& .MuiInputBase-inputSizeSmall": {
                py: "5px",
                fontSize: "0.75rem",
              },
            }}
            size="small"
          >
            <InputLabel id="limit-label">Limit</InputLabel>
            <Select
              labelId="limit-label"
              id="limit"
              value={limit}
              label="Show Records"
              size="small"
              onChange={handleBudgetTemplateLimitChange}
            >
              <MenuItem value={"10"}>10</MenuItem>
              <MenuItem value={"20"}>20</MenuItem>
              <MenuItem value={"30"}>30</MenuItem>
              <MenuItem value={"40"}>40</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <SortMenu sortOptions={sortOptions} modifySort={handleBudgetTemplateSort} />
        </Box>
      </Stack>
    </>
  );
};

export default BudgetTemplateListHeader;
