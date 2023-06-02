import { Field, FieldArrayRenderProps, FormikProps } from "formik";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  JournalEntryFormModel,
  JournalEntryModel,
} from "../../interfaces/JournalEntryInterfaces";
import {
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Checkbox,
  TableFooter,
  Box,
} from "@mui/material";
import {
  MUICheckbox,
  MUIAutocomplete,
  MUIText,
  MUINumber,
} from "../../utils/formik";
import { TRequiredList } from "../../hooks/journalEntry/useJournalEntryForm";
import Dialog from "../dialog/Dialog";
import { formatCurrency } from "../../utils/utilities";

type JournalEntryItemFormProp = {
  formik: FormikProps<JournalEntryFormModel>;
  arrayHelper: FieldArrayRenderProps;
  requiredListObject: TRequiredList;
  journalEntry: JournalEntryModel | null;
  formHandlers: {
    handleSubmit: (values: JournalEntryFormModel) => Promise<void>;
    handleDelete: () => void;
    handleCancelClick: () => void;
    setDeletedJournalEntryItems: Dispatch<SetStateAction<number[]>>;
  };
};

const JournalEntryItemForm: React.FC<JournalEntryItemFormProp> = ({
  formik,
  arrayHelper,
  requiredListObject,
  journalEntry,
  formHandlers,
}) => {
  const checkedItems = formik.values.JournalEntryItems.filter(
    (item) => item.checked === true
  ).length;

  const s = checkedItems > 1 ? "s" : "";

  const dialogMessage = `${checkedItems} record${s} will be deleted. Do you want to proceed?`;

  let totalDebit = 0,
    totalCredit = 0;

  formik.values.JournalEntryItems.forEach((item) => {
    totalDebit += parseFloat(item.debit_amount);
    totalCredit += parseFloat(item.credit_amount);
  });

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
    formik.setFieldValue("Decks", newArray);
    formHandlers.setDeletedJournalEntryItems(deletedJournalEntryItems);
    formik.handleSubmit();
  };

  const [toggleAllCheckbox, setToggleAllCheckbox] = useState<boolean>(false);
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
    arrayHelper.push({
      id: "",
      journal_entry_id: journalEntry ? journalEntry.id : "",
      sub_account_title_id: "",
      debit_amount: "0.00",
      credit_amount: "0.00",
      checked: false,
      touched: false,
    });
    setFocus(Date.now());
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialog = () => setOpenDialog(true);

  const dialogObject = { openDialog, handleCloseDialog, handleOpenDialog };

  useEffect(() => {
    if (inputRef.current && focus !== null) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <Stack direction="column" gap={2}>
      <Stack
        direction="row"
        gap={2}
        alignItems={"center"}
        justifyContent={"flex-end"}
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
            <TableCell>Sub Account Title</TableCell>
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
                  tabIndex={-1}
                />
              </TableCell>
              <TableCell>
                {requiredListObject.subAccountTitles && (
                  <MUIAutocomplete
                    label=""
                    name={`JournalEntryItems.${index}.sub_account_title_id`}
                    items={[
                      { id: "", name: "" },
                      ...requiredListObject.subAccountTitles,
                    ]}
                    freeSolo={false}
                    multiple={false}
                    setArrayTouched={() => {
                      formik.setFieldValue(
                        `JournalEntryItems.${index}.touched`,
                        true
                      );
                    }}
                    inputRef={inputRef}
                  />
                )}
              </TableCell>
              <TableCell>
                <MUINumber
                  name={`JournalEntryItems.${index}.debit_amount`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `JournalEntryItems.${index}.touched`,
                      true
                    );
                  }}
                />
              </TableCell>
              <TableCell>
                <MUINumber
                  name={`JournalEntryItems.${index}.credit_amount`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `JournalEntryItems.${index}.touched`,
                      true
                    );
                  }}
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
        <TableFooter>
          <TableRow sx={{ "& *": { fontWeight: "bold", color: "black" } }}>
            <TableCell sx={{ width: "25px" }}></TableCell>
            <TableCell>Total</TableCell>
            <TableCell align="right">
              <Box sx={{ pr: "14px" }}>{formatCurrency(totalDebit)}</Box>
            </TableCell>
            <TableCell align="right">
              <Box sx={{ pr: "14px" }}>{formatCurrency(totalCredit)}</Box>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button size="small" variant="outlined" onClick={handleAddRowButtonClick}>
        Add Row
      </Button>
      <Dialog
        open={dialogObject.openDialog}
        message={dialogMessage}
        handleCloseDialog={dialogObject.handleCloseDialog}
        handleFunction={handleDeleteChecked}
      />
    </Stack>
  );
};

export default JournalEntryItemForm;
