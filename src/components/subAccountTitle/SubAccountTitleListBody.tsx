import { Box, Button, Paper, Stack } from "@mui/material";
import { TSubAccountTitlesHook } from "../../hooks/subAccountTitle/useSubAccountTitles";
import { BsFilter } from "react-icons/bs";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";
import SubAccountTitleFilter from "./SubAccountTitleFilter";
import SubAccountTitleListHeader from "./SubAccountTitleListHeader";
import SubAccountTitleGrid from "./SubAccountTitleGrid";

const SubAccountTitleListBody: React.FC<{
  props: TSubAccountTitlesHook;
  sidebarEnabled: boolean;
}> = ({ props, sidebarEnabled = false }) => {
  const {
    sortAndLimitObject,
    requiredListObject,
    mainListObject,
    formikObject,
    toggleObject,
    breadCrumbLinks,
  } = props;

  return (
    <Box
      sx={{
        bgcolor: "grey.100",
        height: sidebarEnabled ? "100vh" : "calc(100vh - 64px)",
        display: "flex",
        flex: 1,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} sx={{ width: "100%" }}>
        <Button
          variant="contained"
          startIcon={<BsFilter />}
          sx={{ m: 2, mb: 0, display: { md: "none" } }}
          size="small"
          onClick={toggleObject.toggleFilterForm}
        >
          Show Filter
        </Button>
        <Stack
          direction="column"
          sx={{
            width: { md: 300 },
            height: { xs: "100%" },
            flexShrink: 0,
            display: {
              xs: toggleObject.isFilterFormShown ? "flex" : "none",
              md: "flex",
            },
            position: { xs: "fixed", md: "static" },
            top: { xs: 0 },
            zIndex: 2,
          }}
        >
          {!requiredListObject.isRequiredListLoading && (
            <SubAccountTitleFilter
              toggleFilterForm={toggleObject.toggleFilterForm}
              formikObject={formikObject}
              requiredListObject={requiredListObject}
            />
          )}
        </Stack>
        <Box
          sx={{
            p: 2,
            flexGrow: 1,
            height: "100%",
            display: {
              xs: toggleObject.isFilterFormShown ? "none" : "flex",
              md: "flex",
            },
          }}
        >
          <Paper
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Breadcrumbs links={breadCrumbLinks} />
            <Box
              sx={{
                p: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflowY: "hidden",
              }}
            >
              <Stack direction="row" width={"100%"} alignItems="center">
                <SubAccountTitleListHeader
                  sortAndLimitObject={sortAndLimitObject}
                  renderAddNew={false}
                />
              </Stack>

              <SubAccountTitleGrid
                mainListObject={mainListObject}
                limit={sortAndLimitObject.limit}
              />
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
};

export default SubAccountTitleListBody;
