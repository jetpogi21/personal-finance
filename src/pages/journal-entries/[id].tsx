import React from "react";
import Head from "next/head";
import useJournalEntryForm from "../../hooks/journalEntry/useJournalEntryForm";
import JournalEntryFormBody from "../../components/journalEntry/JournalEntryFormBody";
import { RowStack } from "../../components/MUI/Stack";
import Sidebar from "../../components/Sidebar";

const JournalEntryFormPage = ({ id }: { id: string }) => {
  const props = useJournalEntryForm(id);

  return (
    <>
      <Head>
        <title>Journal Entry Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <JournalEntryFormBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
};

JournalEntryFormPage.getInitialProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  return { id: query.id };
};

export default JournalEntryFormPage;
