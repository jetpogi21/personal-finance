import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import useAccountTitles from "../../hooks/accountTitle/useAccountTitles";
import AccountTitleListBody from "../../components/accountTitle/AccountTitleListBody";
import Sidebar from "../../components/Sidebar";
import { RowStack } from "../../components/MUI/Stack";

export default function AccountTitlePage({ query }: { query: ParsedUrlQuery }) {
  const props = useAccountTitles(query);

  return (
    <>
      <Head>
        <title>Account Title List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <AccountTitleListBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
}

AccountTitlePage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return { query };
};
