import React, { Dispatch, SetStateAction } from "react";
import {
  JournalEntryItemFormModel,
  JournalEntryItemModel,
} from "../../interfaces/JournalEntryItemInterfaces";
import { FormikProps, FieldArrayRenderProps } from "formik";
import { TRequiredList } from "../../hooks/journalEntryItem/useJournalEntryItemForm";
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
} from "../../utils/formik";
import { ConvertBasicModelToControlChoice } from "../../utils/utilities";

type JournalEntryItemMultilineFormProp = {
  formik: FormikProps<Record<"JournalEntryItems", JournalEntryItemFormModel[]>>;
  arrayHelper: FieldArrayRenderProps;
  requiredListObject: TRequiredList;
  journalEntryItems: JournalEntryItemModel[] | null;
  setDeletedJournalEntryItems: Dispatch<SetStateAction<number[]>>;
  handleAddRowButtonClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const JournalEntryItemMultilineForm: React.FC<
  JournalEntryItemMultilineFormProp
> = ({
  formik,
  arrayHelper,
  requiredListObject,
  journalEntryItems,
  setDeletedJournalEntryItems,
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
            <TableCell>Journal Entry Id</TableCell>
            <TableCell>Sub Account Title Id</TableCell>
            <TableCell>Debit Amount</TableCell>
            <TableCell>Credit Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formik.values.JournalEntryItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <MUICheckbox
                  name={`JournalEntryItems.${index}.checked`}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <MUIText
                  name={`JournalEntryItems.${index}.journal_entry_id`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `JournalEntryItems.${index}.touched`,
                      true
                    );
                  }}
                  type="number"
                  inputRef={
                    formik.values.JournalEntryItems.length === index + 1
                      ? inputRef
                      : undefined
                  }
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (
                      formik.values.JournalEntryItems.length === index + 1 &&
                      e.key === "Tab"
                    ) {
                      e.preventDefault();
                      handleAddRowButtonClick();
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <MUIText
                  name={`JournalEntryItems.${index}.sub_account_title_id`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `JournalEntryItems.${index}.touched`,
                      true
                    );
                  }}
                  type="number"
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (
                      formik.values.JournalEntryItems.length === index + 1 &&
                      e.key === "Tab"
                    ) {
                      e.preventDefault();
                      handleAddRowButtonClick();
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <MUIText
                  name={`JournalEntryItems.${index}.debit_amount`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `JournalEntryItems.${index}.touched`,
                      true
                    );
                  }}
                  type="number"
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (
                      formik.values.JournalEntryItems.length === index + 1 &&
                      e.key === "Tab"
                    ) {
                      e.preventDefault();
                      handleAddRowButtonClick();
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <MUIText
                  name={`JournalEntryItems.${index}.credit_amount`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `JournalEntryItems.${index}.touched`,
                      true
                    );
                  }}
                  type="number"
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (
                      formik.values.JournalEntryItems.length === index + 1 &&
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

export default JournalEntryItemMultilineForm;
