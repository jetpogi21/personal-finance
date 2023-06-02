import { Box, Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { BsFilter } from "react-icons/bs";
import { TFormikFilterFormObject, TRequiredList } from "../../hooks/journalEntryItem/useJournalEntryItems";
import { MUIText, MUIRadio } from "../../utils/formik";
import { ConvertBasicModelToControlChoice } from "../../utils/utilities";

type JournalEntryItemFilterProps = {
  toggleFilterForm: () => void;
  formikObject: TFormikFilterFormObject;
  requiredListObject: TRequiredList;
};

const JournalEntryItemFilter: React.FC<JournalEntryItemFilterProps> = ({
  toggleFilterForm,
  formikObject,
  requiredListObject
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
              <Typography fontWeight={"500"}>Filter Journal Entry Items</Typography>
              {requiredListObject.subAccountTitles && (
  <MUIAutocomplete
    label="Sub Account Title"
    name="sub_account_title"
    items={requiredListObject.subAccountTitles}
    multiple={true}
    freeSolo={false}
  />
)}
<MUIText label="Search" name="q" id="q" sx={{ bgcolor: "white" }} size="small" />
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

export default JournalEntryItemFilter;
