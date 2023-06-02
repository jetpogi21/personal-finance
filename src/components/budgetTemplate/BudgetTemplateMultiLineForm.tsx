import React, { Dispatch, SetStateAction } from "react";
import {
  BudgetTemplateFormModel,
  BudgetTemplateModel,
} from "../../interfaces/BudgetTemplateInterfaces";
import { FormikProps, FieldArrayRenderProps } from "formik";
import { TRequiredList } from "../../hooks/budgetTemplate/useBudgetTemplateForm";
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
import {
  MUICheckbox,
  MUIAutocomplete,
  MUIText,
  MUIRadio,
  MUINumber,
} from "../../utils/formik";
import { ConvertBasicModelToControlChoice } from "../../utils/utilities";

type BudgetTemplateMultilineFormProp = {
  formik: FormikProps<Record<"BudgetTemplates", BudgetTemplateFormModel[]>>;
  arrayHelper: FieldArrayRenderProps;
  requiredListObject: TRequiredList;
  budgetTemplates: BudgetTemplateModel[] | null;
  setDeletedBudgetTemplates: Dispatch<SetStateAction<number[]>>;
  handleAddRowButtonClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const BudgetTemplateMultilineForm: React.FC<
  BudgetTemplateMultilineFormProp
> = ({
  formik,
  arrayHelper,
  requiredListObject,
  budgetTemplates,
  setDeletedBudgetTemplates,
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
            <TableCell sx={{ width: "200px" }}>Category</TableCell>
            <TableCell sx={{ width: "200px" }}>Type</TableCell>
            <TableCell align="right" sx={{ width: "150px" }}>
              Amount
            </TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formik.values.BudgetTemplates.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <MUICheckbox
                  name={`BudgetTemplates.${index}.checked`}
                  size="small"
                  tabIndex={-1}
                />
              </TableCell>
              <TableCell>
                {requiredListObject.categories && (
                  <MUIAutocomplete
                    label=""
                    name={`BudgetTemplates.${index}.category`}
                    items={[
                      { id: "", name: "" },
                      ...requiredListObject.categories,
                    ]}
                    freeSolo={false}
                    multiple={false}
                    setArrayTouched={() => {
                      formik.setFieldValue(
                        `BudgetTemplates.${index}.touched`,
                        true
                      );
                    }}
                    inputRef={
                      formik.values.BudgetTemplates.length === index + 1
                        ? inputRef
                        : undefined
                    }
                  />
                )}
              </TableCell>
              <TableCell>
                {requiredListObject.types && (
                  <MUIAutocomplete
                    label=""
                    name={`BudgetTemplates.${index}.type`}
                    items={[{ id: "", name: "" }, ...requiredListObject.types]}
                    freeSolo={false}
                    multiple={false}
                    setArrayTouched={() => {
                      formik.setFieldValue(
                        `BudgetTemplates.${index}.touched`,
                        true
                      );
                    }}
                  />
                )}
              </TableCell>
              <TableCell>
                <MUINumber
                  name={`BudgetTemplates.${index}.amount`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `BudgetTemplates.${index}.touched`,
                      true
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <MUIText
                  name={`BudgetTemplates.${index}.description`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `BudgetTemplates.${index}.touched`,
                      true
                    );
                  }}
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (
                      formik.values.BudgetTemplates.length === index + 1 &&
                      e.key === "Tab"
                    ) {
                      e.preventDefault();
                      handleAddRowButtonClick();
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default BudgetTemplateMultilineForm;
