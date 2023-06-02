import React from "react";
import { JournalEntryModel } from "../../interfaces/JournalEntryInterfaces";
import { Box, Chip, Link as MUILink, Stack } from "@mui/material";
import Link from "next/link";
import {
  convertStringToLocaleString,
  formatCurrency,
} from "../../utils/utilities";
import { RowStack } from "../MUI/Stack";
import {
  HORIZONTAL_SCROLLBAR_STYLES,
  SCROLLBAR_STYLES,
} from "../../utils/constants";

type SingleJournalEntryProp = {
  journalEntry: JournalEntryModel;
};

const SingleJournalEntry: React.FC<SingleJournalEntryProp> = ({
  journalEntry,
}) => {
  let totalDebit = 0;
  let totalCredit = 0;

  journalEntry.JournalEntryItems.forEach((item) => {
    totalDebit += parseFloat(item.debit_amount);
    totalCredit += parseFloat(item.credit_amount);
  });

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      sx={{ height: "100%", overflowX: "hidden", p: 2, pb: 0 }}
      gap={1}
    >
      <MUILink
        component={Link}
        href={`/journal-entries/${journalEntry.id}`}
        sx={{
          fontWeight: "bold",
          fontSize: "0.8rem",
          cursor: "pointer",
          textDecoration: "none",
          color: "primary",
        }}
      >
        {convertStringToLocaleString(journalEntry.date)}
      </MUILink>
      <Box sx={{ whiteSpace: "pre-wrap", flex: 1 }}>{journalEntry.note}</Box>
      <RowStack
        gap={1}
        sx={{ color: "grey.500", fontWeight: "bold", fontSize: "0.80rem" }}
      >
        <Box component="span">Transaction amount: </Box>
        <Box component="span">{formatCurrency(totalDebit)}</Box>
      </RowStack>
      <RowStack
        sx={{
          overflowX: "auto",
          pb: 2,
          ...HORIZONTAL_SCROLLBAR_STYLES,
        }}
        gap={1}
      >
        {[
          ...new Set(
            journalEntry.JournalEntryItems.map(
              (item) => item.SubAccountTitle.sub_account_title
            )
          ),
        ].map((subAccountTitle) => (
          <Chip
            size="small"
            key={subAccountTitle}
            label={subAccountTitle}
            variant="outlined"
          />
        ))}
      </RowStack>
    </Stack>
  );
};

export default SingleJournalEntry;
