import React, { Dispatch, SetStateAction } from "react";
import { Alert, Box, Button, Container, Paper, Stack } from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import Link from "next/link";
import {
  AccountTitleFormModel,
  AccountTitleModel,
} from "../../interfaces/AccountTitleInterfaces";
import { TRequiredList } from "../../hooks/accountTitle/useAccountTitleForm";
import AccountTitleSchema from "../../schema/accountTitle/AccountTitleSchema";
import {
  ConvertBasicModelToControlChoice,
  ConvertNumberArrToControlChoice,
} from "../../utils/utilities";
import { MUIText, MUIRadio, MUIAutocomplete } from "../../utils/formik";
import SubAccountTitleForm from "./SubAccountTitleForm";
import { RowStack } from "../MUI/Stack";

type AccountTitleFormProps = {
  accountTitle: AccountTitleModel | null;
  formInitialValues: AccountTitleFormModel;
  formHandlers: {
    handleSubmit: (values: AccountTitleFormModel) => Promise<void>;
    handleDelete: () => void;
    handleCancelClick: () => void;
    setDeletedSubAccountTitles: Dispatch<SetStateAction<number[]>>;
  };
  requiredListObject: TRequiredList;
  handleOpenDialog: () => void;
  formError: string | null;
};

const AccountTitleForm: React.FC<AccountTitleFormProps> = ({
  accountTitle,
  formInitialValues,
  formHandlers,
  requiredListObject,
  handleOpenDialog,
  formError,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formInitialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={AccountTitleSchema}
      onSubmit={formHandlers.handleSubmit}
    >
      {(formik) => {
        return (
          <Stack
            component="form"
            noValidate
            autoComplete="off"
            direction="column"
            onSubmit={formik.handleSubmit}
            spacing={2}
            p={2}
            sx={{
              "& .MuiFormHelperText-root": {
                fontSize: "0.70rem",
                ml: 1,
              },
              "& .MuiInputLabel-shrink": {
                fontSize: "1rem",
                bgcolor: "white",
                width: "auto",
                pr: 0.8,
                transform: "translate(14px, -11px) scale(0.75)",
              },
            }}
          >
            <Stack direction="column" gap={4}>
              {formError && <Alert severity="error">{formError}</Alert>}
              <Stack direction="column" gap={2}>
                <RowStack>
                  <MUIText label="Account Title" name="account_title" />
                  {requiredListObject.normalBalances && (
                    <MUIRadio
                      label="Normal Balance"
                      name="normal_balance"
                      items={ConvertBasicModelToControlChoice(
                        [],
                        requiredListObject.normalBalances
                      )}
                      row={true}
                    />
                  )}
                </RowStack>
                {
                  <FieldArray name="SubAccountTitles">
                    {(FormikHelper) => (
                      <SubAccountTitleForm
                        formik={formik}
                        arrayHelper={FormikHelper}
                        accountTitle={accountTitle}
                        requiredListObject={requiredListObject}
                        formHandlers={formHandlers}
                      />
                    )}
                  </FieldArray>
                }
              </Stack>
            </Stack>
            <Stack direction="row" gap={1}>
              <Button
                type="submit"
                size="small"
                color="primary"
                variant="contained"
                sx={{ width: 50 }}
              >
                Submit
              </Button>
              {Boolean(accountTitle) && (
                <Button
                  size="small"
                  color="error"
                  variant="contained"
                  sx={{ width: 50 }}
                  onClick={handleOpenDialog}
                >
                  Delete
                </Button>
              )}

              <Button type="submit" size="small" sx={{ width: 50 }}>
                <Link
                  href="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Cancel
                </Link>
              </Button>
            </Stack>
          </Stack>
        );
      }}
    </Formik>
  );
};

export default AccountTitleForm;
