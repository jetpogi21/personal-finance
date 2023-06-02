import React from "react";
import Head from "next/head";
import useBudgetTemplateForm from "../../hooks/budgetTemplate/useBudgetTemplateForm";
import BudgetTemplateFormBody from "../../components/budgetTemplate/BudgetTemplateFormBody";
import { RowStack } from "../../components/MUI/Stack";
import Sidebar from "../../components/Sidebar";

const BudgetTemplateFormPage = ({ id }: { id: string }) => {
  const props = useBudgetTemplateForm(id);

  return (
    <>
      <Head>
        <title>Budget Template Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <BudgetTemplateFormBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
};

BudgetTemplateFormPage.getInitialProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  return { id: query.id };
};

export default BudgetTemplateFormPage;
