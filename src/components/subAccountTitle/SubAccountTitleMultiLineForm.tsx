import React, { Dispatch, SetStateAction } from "react";
import {
  SubAccountTitleFormModel,
  SubAccountTitleModel,
} from "../../interfaces/SubAccountTitleInterfaces";
import { FormikProps, FieldArrayRenderProps } from "formik";
import { TRequiredList } from "../../hooks/subAccountTitle/useSubAccountTitleForm";
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
import { MUICheckbox, MUIAutocomplete, MUIText, MUIRadio } from "../../utils/formik";
import { ConvertBasicModelToControlChoice } from "../../utils/utilities";

type SubAccountTitleMultilineFormProp = {
  formik: FormikProps<Record<"SubAccountTitles", SubAccountTitleFormModel[]>>;
  arrayHelper: FieldArrayRenderProps;
  requiredListObject: TRequiredList;
  subAccountTitles: SubAccountTitleModel[] | null;
  setDeletedSubAccountTitles: Dispatch<SetStateAction<number[]>>;
  handleAddRowButtonClick: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const SubAccountTitleMultilineForm: React.FC<SubAccountTitleMultilineFormProp> = ({
  formik,
  arrayHelper,
  requiredListObject,
  subAccountTitles,
  setDeletedSubAccountTitles,
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
            <TableCell>Sub Account Title</TableCell>
<TableCell>Account Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {formik.values.SubAccountTitles.map((item, index) => (
    <TableRow key={index}>
      <TableCell>
        <MUICheckbox name={`SubAccountTitles.${index}.checked`} size="small" />
      </TableCell>
      <TableCell><MUIText
  name={`SubAccountTitles.${index}.sub_account_title`}
  label={""}
  setArrayTouched={() => {
    formik.setFieldValue(`SubAccountTitles.${index}.touched`, true);
  }}
  
  inputRef={
  formik.values.SubAccountTitles.length === index + 1
    ? inputRef
    : undefined
}
  
/></TableCell>
<TableCell>{
  requiredListObject.accountTitles && (
    <MUIRadio
      label=""
      name={`SubAccountTitles.${index}.account_title_id`}
      items={ConvertBasicModelToControlChoice(
        [],
        requiredListObject.accountTitles
      )}
      setArrayTouched={() => {
        formik.setFieldValue(`SubAccountTitles.${index}.touched`, true);
      }}
      row={true}
      onKeyDown={(e: React.KeyboardEvent) => {
  if (e.key === "Tab") {
    if (formik.values.SubAccountTitles.length === index + 1) {
      e.preventDefault();
      handleAddRowButtonClick();
    }
  }
}}
    />
  )
}</TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </Stack>
  );
};

export default SubAccountTitleMultilineForm;
