import { Paper, Button } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { RowStack } from "../MUI/Stack";
import CustomDateRangePicker from "../dateRangePicker/DateRangePicker";
import { MUIAutocomplete } from "../../utils/formik";
import { SubAccountTitleModel } from "../../interfaces/SubAccountTitleInterfaces";

interface AccountSelectionProps {
  subAccountTitles: SubAccountTitleModel[];
  id: string;
  handleSubAccountMovementFormSubmit: (values: {
    sub_account_title: string | null;
  }) => void;
}

const AccountSelection: React.FC<AccountSelectionProps> = ({
  subAccountTitles,
  id,
  handleSubAccountMovementFormSubmit,
}) => {
  const filterFormInitialValue = { sub_account_title: id };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={filterFormInitialValue}
      onSubmit={handleSubAccountMovementFormSubmit}
    >
      {(formik) => {
        return (
          <form>
            <RowStack>
              <MUIAutocomplete
                label="Account Title"
                items={[
                  { id: "", name: "" },
                  ...subAccountTitles.map((item) => ({
                    id: item.id,
                    name: item.sub_account_title,
                  })),
                ]}
                name="sub_account_title"
                multiple={false}
                freeSolo={false}
                onUpdate={() => {
                  formik.handleSubmit();
                }}
              />
            </RowStack>
          </form>
        );
      }}
    </Formik>
  );
};

export default AccountSelection;
