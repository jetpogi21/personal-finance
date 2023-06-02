import React, { Dispatch, SetStateAction } from "react";
import {
  BudgetItemFormModel,
  BudgetItemModel,
} from "../../interfaces/BudgetItemInterfaces";
import { FormikProps, FieldArrayRenderProps } from "formik";
import { TRequiredList } from "../../hooks/budgetItem/useBudgetItemForm";
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MUICheckbox, MUIAutocomplete, MUIText, MUIRadio, MUINumber } from "../../utils/formik";
import { ConvertBasicModelToControlChoice } from "../../utils/utilities";

type BudgetItemMultilineFormProp = {
  formik: FormikProps<Record<"BudgetItems", BudgetItemFormModel[]>>;
  arrayHelper: FieldArrayRenderProps;
  requiredListObject: TRequiredList;
  budgetItems: BudgetItemModel[] | null;
  setDeletedBudgetItems: Dispatch<SetStateAction<number[]>>;
  handleAddRowButtonClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const BudgetItemMultilineForm: React.FC<BudgetItemMultilineFormProp> = ({
  formik,
  arrayHelper,
  requiredListObject,
  budgetItems,
  setDeletedBudgetItems,
  handleAddRowButtonClick,
  inputRef,
}) => {
  return (
    <Stack direction="column" gap={1}>
      <Table
        size="small"
        sx={{
          "& .MuiTableCell-root": {
            borderBottom: 0,
            fontSize: "inherit",
            lineHeight: "1rem",
            pl: 0,
            verticalAlign: "top",
          },
          "& tr td:last-child": {
            pr: 0,
          },
        }}
      >
                <TableHead>
          <TableRow>
            <TableCell sx={{ width: "25px" }}></TableCell>
            <TableCell  >Budget</TableCell>
<TableCell  sx={{ width: "200px" }}>Category</TableCell>
<TableCell  sx={{ width: "200px" }}>Type</TableCell>
<TableCell align = "right" sx={{ width: "150px" }}>Amount</TableCell>
<TableCell  >Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {formik.values.BudgetItems.map((item, index) => (
    <TableRow key={index}>
      <TableCell>
        <MUICheckbox name={`BudgetItems.${index}.checked`} size="small" tabIndex={-1} />
      </TableCell>
      <TableCell><MUIText
  name={`BudgetItems.${index}.budget_id`}
  label={""}
  setArrayTouched={() => {
    formik.setFieldValue(`BudgetItems.${index}.touched`, true);
  }}
  type="number"
  inputRef={
  formik.values.BudgetItems.length === index + 1
    ? inputRef
    : undefined
}
  
/></TableCell>
<TableCell>{requiredListObject.categories && (
  <MUIAutocomplete
    label=""
    name={`BudgetItems.${index}.category`}
    items={[{ id: "", name: "" }, ...requiredListObject.categories]}
    freeSolo={false}
    multiple={false}
    setArrayTouched={() => {
      formik.setFieldValue(
        `BudgetItems.${index}.touched`,
        true
      );
    }}
    
    
  />
)}</TableCell>
<TableCell>{requiredListObject.types && (
  <MUIAutocomplete
    label=""
    name={`BudgetItems.${index}.type`}
    items={[{ id: "", name: "" }, ...requiredListObject.types]}
    freeSolo={false}
    multiple={false}
    setArrayTouched={() => {
      formik.setFieldValue(
        `BudgetItems.${index}.touched`,
        true
      );
    }}
    
    
  />
)}</TableCell>
<TableCell><MUINumber
  name={`BudgetItems.${index}.amount`}
  label={""}
  setArrayTouched={() => {
    formik.setFieldValue(`BudgetItems.${index}.touched`, true);
  }}
  
  
/></TableCell>
<TableCell><MUIText
  name={`BudgetItems.${index}.description`}
  label={""}
  setArrayTouched={() => {
    formik.setFieldValue(`BudgetItems.${index}.touched`, true);
  }}
  
  
  onKeyDown={(e: React.KeyboardEvent) => {
  if (formik.values.BudgetItems.length === index + 1 && e.key === "Tab") {
     e.preventDefault();
     handleAddRowButtonClick();
  }
}}
/></TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </Stack>
  );
};

export default BudgetItemMultilineForm;
