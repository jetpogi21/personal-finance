import React from "react";
import { TMainListObject } from "../../hooks/subAccountTitle/useSubAccountTitles";
import { Box, Stack, Typography } from "@mui/material";
import Pagination from "../pagination/Pagination";
import SubAccountTitleForm from "./SubAccountTitleForm";
import useSubAccountTitleForm from "../../hooks/subAccountTitle/useSubAccountTitleForm";

type SubAccountTitleGridProps = {
  mainListObject: TMainListObject;
  limit: string;
};

const SubAccountTitleGrid: React.FC<SubAccountTitleGridProps> = ({
  mainListObject,
  limit,
}) => {
  const { subAccountTitles, gridLoading, recordCount } = mainListObject;
  const {
    formInitialValues,
    formHandlers,
    requiredListObject,
    dialogObject,
    formError,
  } = useSubAccountTitleForm(subAccountTitles);

  return !gridLoading ? (
    <>
      <SubAccountTitleForm
        subAccountTitles={subAccountTitles}
        formInitialValues={formInitialValues}
        formHandlers={formHandlers}
        requiredListObject={requiredListObject}
        formError={formError}
        dialogObject={dialogObject}
      />
      <Pagination recordCount={recordCount} limit={limit} />
    </>
  ) : (
    <Typography fontWeight="bold">Loading...</Typography>
  );
};

export default SubAccountTitleGrid;

