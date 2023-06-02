import Head from "next/head";
import { ParsedUrlQuery } from "querystring";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import useBudgetTemplates from "../../hooks/budgetTemplate/useBudgetTemplates";
import BudgetTemplateListBody from "../../components/budgetTemplate/BudgetTemplateListBody";
import Sidebar from "../../components/Sidebar";
import { RowStack } from "../../components/MUI/Stack";

export default function BudgetTemplatePage({ query }: { query: ParsedUrlQuery }) {
  const props = useBudgetTemplates(query);

  return (
    <>
      <Head>
        <title>Budget Template List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <BudgetTemplateListBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
}

BudgetTemplatePage.getInitialProps = async ({
  query,
}: {
  query: ParsedUrlQuery;
}) => {
  return { query };
};
