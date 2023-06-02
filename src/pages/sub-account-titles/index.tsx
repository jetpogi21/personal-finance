import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import useSubAccountTitles from "../../hooks/subAccountTitle/useSubAccountTitles";
import SubAccountTitleListBody from "../../components/subAccountTitle/SubAccountTitleListBody";
import Sidebar from "../../components/Sidebar";
import { RowStack } from "../../components/MUI/Stack";

export default function SubAccountTitlePage({
  query,
}: {
  query: ParsedUrlQuery;
}) {
  const props = useSubAccountTitles(query);

  return (
    <>
      <Head>
        <title>Sub Account Title List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <SubAccountTitleListBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
}

SubAccountTitlePage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return { query };
};
