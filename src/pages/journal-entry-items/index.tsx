import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import useJournalEntryItems from "../../hooks/journalEntryItem/useJournalEntryItems";
import JournalEntryItemListBody from "../../components/journalEntryItem/JournalEntryItemListBody";

export default function JournalEntryItemPage({ query }: { query: ParsedUrlQuery }) {
  const props = useJournalEntryItems(query);

  return (
    <>
      <Head>
        <title>Journal Entry Item List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <JournalEntryItemListBody props={props} />
    </>
  );
}

JournalEntryItemPage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return { query };
};

