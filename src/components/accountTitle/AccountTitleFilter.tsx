import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { BsFilter } from "react-icons/bs";
import {
  TFormikFilterFormObject,
  TRequiredList,
} from "../../hooks/accountTitle/useAccountTitles";
import { MUIText, MUIRadio } from "../../utils/formik";
import { ConvertBasicModelToControlChoice } from "../../utils/utilities";

type AccountTitleFilterProps = {
  toggleFilterForm: () => void;
  formikObject: TFormikFilterFormObject;
  requiredListObject: TRequiredList;
};

const AccountTitleFilter: React.FC<AccountTitleFilterProps> = ({
  toggleFilterForm,
  formikObject,
  requiredListObject,
}) => {
  const {
    filterFormInitialValue,
    handleFilterFormSubmit,
    handleFilterFormReset,
  } = formikObject;

  return (
    <Box
      sx={{
        boxShadow: 1,
        height: "100%",
        p: { xs: 3, md: 2 },
        bgcolor: "white",
        zIndex: 1,
        overflowY: "auto",
      }}
    >
      <Button
        variant="contained"
        startIcon={<BsFilter />}
        size="small"
        onClick={toggleFilterForm}
        sx={{ mb: 2, display: { md: "none" } }}
      >
        Hide Filter
      </Button>
      <Formik
        enableReinitialize={true}
        initialValues={filterFormInitialValue}
        onSubmit={handleFilterFormSubmit}
      >
        {(formik) => {
          return (
            <Stack
              component="form"
              noValidate
              autoComplete="off"
              direction="column"
              onSubmit={formik.handleSubmit}
              gap={2}
            >
              <Typography fontWeight={"500"}>Filter Account Titles</Typography>
              <MUIText
                label="Search"
                name="q"
                id="q"
                sx={{ bgcolor: "white" }}
                size="small"
              />
              <MUIRadio
                label="Normal Balance"
                name="nb"
                items={ConvertBasicModelToControlChoice(
                  [{ value: "all", label: "all" }],
                  requiredListObject.normalBalances
                )}
                row={true}
                numColumns={3}
                radioProps={{ size: "small" }}
              />
              <Stack direction="row" sx={{ gap: 1, "& button": { flex: 1 } }}>
                <Button type="submit" variant="contained">
                  Filter
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() => handleFilterFormReset(formik)}
                >
                  Reset
                </Button>
              </Stack>
            </Stack>
          );
        }}
      </Formik>
    </Box>
  );
};

export default AccountTitleFilter;
