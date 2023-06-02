import React from "react";
import Head from "next/head";
import useBudgetForm from "../../hooks/budget/useBudgetForm";
import BudgetFormBody from "../../components/budget/BudgetFormBody";
import { RowStack } from "../../components/MUI/Stack";
import Sidebar from "../../components/Sidebar";

const BudgetFormPage = ({ id }: { id: string }) => {
  const props = useBudgetForm(id);

  return (
    <>
      <Head>
        <title>Budget Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <BudgetFormBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
};

BudgetFormPage.getInitialProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  return { id: query.id };
};

export default BudgetFormPage;
