import React from "react";
import Head from "next/head";
import useBudgetItemForm from "../../hooks/budgetItem/useBudgetItemForm";
import BudgetItemFormBody from "../../components/budgetItem/BudgetItemFormBody";
import { RowStack } from "../../components/MUI/Stack";
import Sidebar from "../../components/Sidebar";

const BudgetItemFormPage = ({ id }: { id: string }) => {
  const props = useBudgetItemForm(id);

  return (
    <>
      <Head>
        <title>Budget Item Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <BudgetItemFormBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
};

BudgetItemFormPage.getInitialProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  return { id: query.id };
};

export default BudgetItemFormPage;
