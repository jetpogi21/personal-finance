import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import useJournalEntries from "../../hooks/journalEntry/useJournalEntries";
import JournalEntryListBody from "../../components/journalEntry/JournalEntryListBody";
import Sidebar from "../../components/Sidebar";
import { RowStack } from "../../components/MUI/Stack";

export default function JournalEntryPage({ query }: { query: ParsedUrlQuery }) {
  const props = useJournalEntries(query);

  return (
    <>
      <Head>
        <title>Journal Entry List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <JournalEntryListBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
}

JournalEntryPage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return { query };
};
