import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert, Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import { FieldArray, Formik, FormikHelpers } from "formik";
import {
  SubAccountTitleFormModel,
  SubAccountTitleModel,
} from "../../interfaces/SubAccountTitleInterfaces";
import { TRequiredList } from "../../hooks/subAccountTitle/useSubAccountTitleForm";
import SubAccountTitleSchema from "../../schema/subAccountTitle/SubAccountTitleSchema";
import Dialog from "../dialog/Dialog";
import SubAccountTitleMultilineForm from "./SubAccountTitleMultiLineForm";
import { ColumnStack } from "../MUI/Stack";

type SubAccountTitleFormProps = {
  subAccountTitles: SubAccountTitleModel[] | null;
  formInitialValues: Record<"SubAccountTitles", SubAccountTitleFormModel[]>;
  formHandlers: {
    handleSubmit: (
      values: Record<"SubAccountTitles", SubAccountTitleFormModel[]>,
      formikHelpers: FormikHelpers<
        Record<"SubAccountTitles", SubAccountTitleFormModel[]>
      >
    ) => Promise<void>;
    handleCancelClick: () => void;
    setDeletedSubAccountTitles: Dispatch<SetStateAction<number[]>>;
  };
  requiredListObject: TRequiredList;
  dialogObject: {
    openDialog: boolean;
    handleCloseDialog: () => void;
    handleOpenDialog: () => void;
  };
  formError: string | null;
};

const SubAccountTitleForm: React.FC<SubAccountTitleFormProps> = ({
  subAccountTitles,
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
      validationSchema={SubAccountTitleSchema}
      onSubmit={formHandlers.handleSubmit}
    >
      {(formik) => {
        //Generate the Dialog Message (dialogMessage)
        const checkedItems = formik.values.SubAccountTitles.filter(
          (item) => item.checked === true
        ).length;
        const s = checkedItems > 1 ? "s" : "";
        const dialogMessage = `${checkedItems} record${s} will be deleted. Do you want to proceed?`;

        //This will handle the "Delete Selected Button"
        const handleDeleteChecked = () => {
          const deletedSubAccountTitles: number[] = [];
          const newArray = formik.values.SubAccountTitles.filter((item) => {
            if (!item.checked) {
              return true;
            } else {
              if (item.id !== "") {
                deletedSubAccountTitles.push(parseInt(item.id));
              }
            }
          });
          formik.setFieldValue("SubAccountTitles", newArray);
          formHandlers.setDeletedSubAccountTitles(deletedSubAccountTitles);
          formik.handleSubmit();
        };

        const [toggleAllCheckbox, setToggleAllCheckbox] =
          useState<boolean>(false);
        const [focus, setFocus] = useState<number | null>(null);
        const inputRef = useRef<HTMLInputElement>(null);

        const handeToggleAllCheckbox = () => {
          formik.setFieldValue(
            "SubAccountTitles",
            formik.values.SubAccountTitles.map((item) => ({
              ...item,
              checked: !toggleAllCheckbox,
            }))
          );
          setToggleAllCheckbox(!toggleAllCheckbox);
        };

        const handleAddRowButtonClick = () => {
          formik.setFieldValue("SubAccountTitles", [
            ...formik.values.SubAccountTitles,
            {
              sub_account_title: "",
              account_title_id:
                requiredListObject.accountTitles &&
                requiredListObject.accountTitles.length > 0
                  ? requiredListObject.accountTitles[0].id.toString()
                  : "",
              id: "",
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
                    <FieldArray name="SubAccountTitles">
                      {(FormikHelper) => (
                        <SubAccountTitleMultilineForm
                          formik={formik}
                          arrayHelper={FormikHelper}
                          subAccountTitles={subAccountTitles}
                          requiredListObject={requiredListObject}
                          setDeletedSubAccountTitles={
                            formHandlers.setDeletedSubAccountTitles
                          }
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

export default SubAccountTitleForm;
