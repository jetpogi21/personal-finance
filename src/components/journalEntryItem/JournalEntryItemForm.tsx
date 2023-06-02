import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert, Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import { FieldArray, Formik, FormikHelpers } from "formik";
import { JournalEntryItemFormModel, JournalEntryItemModel } from "../../interfaces/JournalEntryItemInterfaces";
import { TRequiredList } from "../../hooks/journalEntryItem/useJournalEntryItemForm";
import JournalEntryItemSchema from "../../schema/journalEntryItem/JournalEntryItemSchema";
import Dialog from "../dialog/Dialog";
import JournalEntryItemMultilineForm from "./JournalEntryItemMultiLineForm";

type JournalEntryItemFormProps = {
  journalEntryItems: JournalEntryItemModel[] | null;
  formInitialValues: Record<"JournalEntryItems", JournalEntryItemFormModel[]>;
  formHandlers: {
    handleSubmit: (
      values: Record<"JournalEntryItems", JournalEntryItemFormModel[]>,
      formikHelpers: FormikHelpers<Record<"JournalEntryItems", JournalEntryItemFormModel[]>>
    ) => Promise<void>;
    handleCancelClick: () => void;
    setDeletedJournalEntryItems: Dispatch<SetStateAction<number[]>>;
  };
  requiredListObject: TRequiredList;
  dialogObject: {
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleOpenDialog: () => void;
  };
  formError: string | null;
};

const JournalEntryItemForm: React.FC<JournalEntryItemFormProps> = ({
  journalEntryItems,
  formInitialValues,
  formHandlers,
  requiredListObject,
  dialogObject,
  formError,
}) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formInitialValues}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={JournalEntryItemSchema}
      onSubmit={formHandlers.handleSubmit}
    >
      {(formik) => {
        //Generate the Dialog Message (dialogMessage)
        const checkedItems = formik.values.JournalEntryItems.filter(
          (item) => item.checked === true
        ).length;
        const s = checkedItems > 1 ? "s" : "";
        const dialogMessage = `${checkedItems} record${s} will be deleted. Do you want to proceed?`;

        //This will handle the "Delete Selected Button"
        const handleDeleteChecked = () => {
          const deletedJournalEntryItems: number[] = [];
          const newArray = formik.values.JournalEntryItems.filter((item) => {
            if (!item.checked) {
              return true;
            } else {
              if (item.id !== "") {
                deletedJournalEntryItems.push(parseInt(item.id));
              }
            }
          });
          formik.setFieldValue("JournalEntryItems", newArray);
          formHandlers.setDeletedJournalEntryItems(deletedJournalEntryItems);
          formik.handleSubmit();
        };

        const [toggleAllCheckbox, setToggleAllCheckbox] =
          useState<boolean>(false);
        const [focus, setFocus] = useState<number | null>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        const handeToggleAllCheckbox = () => {
          formik.setFieldValue(
            "JournalEntryItems",
            formik.values.JournalEntryItems.map((item) => ({
              ...item,
              checked: !toggleAllCheckbox,
            }))
          );
          setToggleAllCheckbox(!toggleAllCheckbox);
        };

        const handleAddRowButtonClick = () => {
  formik.setFieldValue("JournalEntryItems", [
    ...formik.values.JournalEntryItems,
    {
      id: "",
journal_entry_id: requiredListObject.journalEntries && requiredListObject.journalEntries.length > 0 ? requiredListObject.journalEntries[0].id.toString() : "",
sub_account_title_id: requiredListObject.subAccountTitles && requiredListObject.subAccountTitles.length > 0 ? requiredListObject.subAccountTitles[0].id.toString() : "",
debit_amount: "0.00",
credit_amount: "0.00",
      touched: false,
      checked: false,
    },
  ]);
  setFocus(Date.now());
};

        useEffect(() => {
          if (inputRef.current && focus !== null) {
            inputRef.current.focus();
          }
        }, [focus]);

        return (
          <>
            <ColumnStack>
              {formError && <Alert severity="error">{formError}</Alert>}
            <Stack
              direction="row"
              gap={2}
              alignItems={"center"}
              height={"30px"}
            >
              <Checkbox
                checked={toggleAllCheckbox}
                onChange={handeToggleAllCheckbox}
                size="small"
tabIndex={-1}
              />
              {checkedItems > 0 && <Typography>{checkedItems}</Typography>}

              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={dialogObject.handleOpenDialog}
                disabled={checkedItems === 0}
                sx={{ ml: "auto" }}
              >
                Delete Selected
              </Button>
            </Stack>
</ColumnStack>
            <Stack
              component="form"
              noValidate
              autoComplete="off"
              direction="column"
              onSubmit={formik.handleSubmit}
              gap={1}
              flex={1}
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
                pr: 1,
                overflow: "hidden",
              }}
            >
              <Stack
                direction="column"
                gap={2}
                flex={1}
                sx={{ overflowY: "auto" }}
              >
                
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {
                    <FieldArray name="JournalEntryItems">
                      {(FormikHelper) => (
                        <JournalEntryItemMultilineForm
                          formik={formik}
                          arrayHelper={FormikHelper}
                          journalEntryItems={journalEntryItems}
                          requiredListObject={requiredListObject}
                          setDeletedJournalEntryItems={formHandlers.setDeletedJournalEntryItems}
                          handleAddRowButtonClick={handleAddRowButtonClick}
                          inputRef={inputRef}
                        />
                      )}
                    </FieldArray>
                  }
                </Box>
              </Stack>
              <Stack direction="row" gap={1}>
                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ width: 150 }}
                  onClick={handleAddRowButtonClick}
                >
                  Add Row
                </Button>
                <Button
                  type="submit"
                  size="small"
                  color="primary"
                  variant="contained"
                  sx={{ width: 150 }}
                >
                  Save Changes
                </Button>
              </Stack>
            </Stack>

            <Dialog
              open={dialogObject.openDialog}
              message={dialogMessage}
              handleCloseDialog={dialogObject.handleCloseDialog}
              handleFunction={handleDeleteChecked}
            />
          </>
        );
      }}
    </Formik>
  );
};

export default JournalEntryItemForm;
