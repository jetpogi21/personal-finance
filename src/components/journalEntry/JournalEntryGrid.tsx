import React from "react";
import { TMainListObject } from "../../hooks/journalEntry/useJournalEntries";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Pagination from "../pagination/Pagination";
import SingleJournalEntry from "./SingleJournalEntry";
import { RowStack } from "../MUI/Stack";

type JournalEntryGripProps = {
  mainListObject: TMainListObject;
  limit: string;
};

const JournalEntryGrid: React.FC<JournalEntryGripProps> = ({
  mainListObject,
  limit,
}) => {
  const { journalEntries, gridLoading, recordCount } = mainListObject;

  return (
    <Box py={0} display="flex" flex={1} flexDirection={"column"}>
      {!gridLoading ? (
        <Stack direction="column" gap={2} flex={1}>
          {journalEntries.length === 0 ? (
            <Typography>There is no data.</Typography>
          ) : (
            <>
              <Grid container columns={12} spacing={2}>
                {journalEntries.map((journalEntry) => {
                  return (
                    <Grid
                      key={journalEntry.id}
                      item={true}
                      xs={12}
                      sm={6}
                      md={12}
                      lg={6}
                      xl={3}
                      sx={{ fontSize: "0.9rem" }}
                    >
                      <Paper
                        sx={{
                          height: "100%",
                          borderRadius: 1,
                        }}
                        elevation={1}
                      >
                        <SingleJournalEntry journalEntry={journalEntry} />
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
              <RowStack mt={"auto"}>
                <Pagination recordCount={recordCount} limit={limit} />
              </RowStack>
            </>
          )}
        </Stack>
      ) : (
        <Typography fontWeight="bold">Loading...</Typography>
      )}
    </Box>
  );
};

export default JournalEntryGrid;
