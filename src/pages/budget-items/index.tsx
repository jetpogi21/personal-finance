import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import useBudgetItems from "../../hooks/budgetItem/useBudgetItems";
import BudgetItemListBody from "../../components/budgetItem/BudgetItemListBody";
import Sidebar from "../../components/Sidebar";
import { RowStack } from "../../components/MUI/Stack";

export default function BudgetItemPage({ query }: { query: ParsedUrlQuery }) {
  const props = useBudgetItems(query);

  return (
    <>
      <Head>
        <title>Budget Item List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <BudgetItemListBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
}

BudgetItemPage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return { query };
};
