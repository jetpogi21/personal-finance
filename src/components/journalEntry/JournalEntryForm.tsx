import React, { Dispatch, SetStateAction, useRef } from "react";
import { Alert, Box, Button, Container, Paper, Stack } from "@mui/material";
import { Field, FieldArray, Formik } from "formik";
import Link from "next/link";
import {
  JournalEntryFormModel,
  JournalEntryModel,
} from "../../interfaces/JournalEntryInterfaces";
import { TRequiredList } from "../../hooks/journalEntry/useJournalEntryForm";
import JournalEntrySchema from "../../schema/journalEntry/JournalEntrySchema";
import {
  ConvertBasicModelToControlChoice,
  ConvertNumberArrToControlChoice,
} from "../../utils/utilities";
import {
  MUIText,
  MUIRadio,
  MUIAutocomplete,
  MUIDatePicker,
} from "../../utils/formik";
import JournalEntryItemForm from "./JournalEntryItemForm";

import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("../editor/Editor"), {
  ssr: false,
});

type JournalEntryFormProps = {
  journalEntry: JournalEntryModel | null;
  formInitialValues: JournalEntryFormModel;
  formHandlers: {
    handleSubmit: (values: JournalEntryFormModel) => Promise<void>;
    handleDelete: () => void;
    handleCancelClick: () => void;
    setDeletedJournalEntryItems: Dispatch<SetStateAction<number[]>>;
  };
  requiredListObject: TRequiredList;
  handleOpenDialog: () => void;
  formError: string | null;
};

const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  journalEntry,
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
      validationSchema={JournalEntrySchema}
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
                <MUIDatePicker label="Date" name="date" setFocusOnLoad={true} />
                <MUIText label="Note" name="note" multiline minRows={9} />
                {
                  <FieldArray name="JournalEntryItems">
                    {(FormikHelper) => (
                      <JournalEntryItemForm
                        formik={formik}
                        arrayHelper={FormikHelper}
                        journalEntry={journalEntry}
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
              {Boolean(journalEntry) && (
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

export default JournalEntryForm;
