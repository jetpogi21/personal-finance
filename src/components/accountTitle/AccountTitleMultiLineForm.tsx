import React, { Dispatch, SetStateAction } from "react";
import {
  AccountTitleFormModel,
  AccountTitleModel,
} from "../../interfaces/AccountTitleInterfaces";
import { FormikProps, FieldArrayRenderProps } from "formik";
import { TRequiredList } from "../../hooks/accountTitle/useAccountTitleForm";
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

type AccountTitleMultilineFormProp = {
  formik: FormikProps<Record<"AccountTitles", AccountTitleFormModel[]>>;
  arrayHelper: FieldArrayRenderProps;
  requiredListObject: TRequiredList;
  accountTitles: AccountTitleModel[] | null;
  setDeletedAccountTitles: Dispatch<SetStateAction<number[]>>;
  handleAddRowButtonClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const AccountTitleMultilineForm: React.FC<AccountTitleMultilineFormProp> = ({
  formik,
  arrayHelper,
  requiredListObject,
  accountTitles,
  setDeletedAccountTitles,
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
            <TableCell>Account Title</TableCell>
            <TableCell>Normal Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {formik.values.AccountTitles.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <MUICheckbox
                  name={`AccountTitles.${index}.checked`}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <MUIText
                  name={`AccountTitles.${index}.account_title`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `AccountTitles.${index}.touched`,
                      true
                    );
                  }}
                  inputRef={
                    formik.values.AccountTitles.length === index + 1
                      ? inputRef
                      : undefined
                  }
                />
              </TableCell>
              <TableCell>
                {requiredListObject.normalBalances && (
                  <MUIRadio
                    label=""
                    name={`AccountTitles.${index}.normal_balance`}
                    items={ConvertBasicModelToControlChoice(
                      [],
                      requiredListObject.normalBalances
                    )}
                    setArrayTouched={() => {
                      formik.setFieldValue(
                        `AccountTitles.${index}.touched`,
                        true
                      );
                    }}
                    row={true}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Tab") {
                        if (formik.values.AccountTitles.length === index + 1) {
                          e.preventDefault();
                          handleAddRowButtonClick();
                        }
                      }
                    }}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default AccountTitleMultilineForm;
