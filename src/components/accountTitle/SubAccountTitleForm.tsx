import { Field, FieldArrayRenderProps, FormikProps } from "formik";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AccountTitleFormModel,
  AccountTitleModel,
} from "../../interfaces/AccountTitleInterfaces";
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
} from "@mui/material";
import { MUICheckbox, MUIAutocomplete, MUIText } from "../../utils/formik";
import { TRequiredList } from "../../hooks/accountTitle/useAccountTitleForm";
import Dialog from "../dialog/Dialog";

type SubAccountTitleFormProp = {
  formik: FormikProps<AccountTitleFormModel>;
  arrayHelper: FieldArrayRenderProps;
  requiredListObject: TRequiredList;
  accountTitle: AccountTitleModel | null;
  formHandlers: {
    handleSubmit: (values: AccountTitleFormModel) => Promise<void>;
    handleDelete: () => void;
    handleCancelClick: () => void;
    setDeletedSubAccountTitles: Dispatch<SetStateAction<number[]>>;
  };
};

const SubAccountTitleForm: React.FC<SubAccountTitleFormProp> = ({
  formik,
  arrayHelper,
  requiredListObject,
  accountTitle,
  formHandlers,
}) => {
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
    formik.setFieldValue("Decks", newArray);
    formHandlers.setDeletedSubAccountTitles(deletedSubAccountTitles);
    formik.handleSubmit();
  };

  const [toggleAllCheckbox, setToggleAllCheckbox] = useState<boolean>(false);
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
    arrayHelper.push({
      sub_account_title: "",
      account_title_id: accountTitle ? accountTitle.id : "",
      id: "",
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
          </TableRow>
        </TableHead>
        <TableBody>
          {formik.values.SubAccountTitles.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                <MUICheckbox
                  name={`SubAccountTitles.${index}.checked`}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <MUIText
                  name={`SubAccountTitles.${index}.sub_account_title`}
                  label={""}
                  setArrayTouched={() => {
                    formik.setFieldValue(
                      `SubAccountTitles.${index}.touched`,
                      true
                    );
                  }}
                  inputRef={
                    formik.values.SubAccountTitles.length === index + 1
                      ? inputRef
                      : undefined
                  }
                  onKeyDown={(e: React.KeyboardEvent) => {
                    if (
                      formik.values.SubAccountTitles.length === index + 1 &&
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

export default SubAccountTitleForm;
