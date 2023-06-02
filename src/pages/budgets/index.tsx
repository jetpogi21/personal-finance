import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import useBudgets from "../../hooks/budget/useBudgets";
import BudgetListBody from "../../components/budget/BudgetListBody";
import Sidebar from "../../components/Sidebar";
import { RowStack } from "../../components/MUI/Stack";

export default function BudgetPage({ query }: { query: ParsedUrlQuery }) {
  const props = useBudgets(query);

  return (
    <>
      <Head>
        <title>Budget List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <BudgetListBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
}

BudgetPage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return { query };
};
