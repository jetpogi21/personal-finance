import React from "react";
import { TMainListObject } from "../../hooks/journalEntryItem/useJournalEntryItems";
import { Box, Stack, Typography } from "@mui/material";
import Pagination from "../pagination/Pagination";
import JournalEntryItemForm from "./JournalEntryItemForm";
import useJournalEntryItemForm from "../../hooks/journalEntryItem/useJournalEntryItemForm";

type JournalEntryItemGridProps = {
  mainListObject: TMainListObject;
  limit: string;
};

const JournalEntryItemGrid: React.FC<JournalEntryItemGridProps> = ({
  mainListObject,
  limit,
}) => {
  const { journalEntryItems, gridLoading, recordCount } = mainListObject;
  const {
    formInitialValues,
    formHandlers,
    requiredListObject,
    dialogObject,
    formError,
  } = useJournalEntryItemForm(journalEntryItems);

  return !gridLoading ? (
    <>
      <JournalEntryItemForm
        journalEntryItems={journalEntryItems}
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

export default JournalEntryItemGrid;

