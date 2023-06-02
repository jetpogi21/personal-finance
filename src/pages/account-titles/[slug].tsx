import React from "react";
import Head from "next/head";
import useAccountTitleForm from "../../hooks/accountTitle/useAccountTitleForm";
import AccountTitleFormBody from "../../components/accountTitle/AccountTitleFormBody";
import { RowStack } from "../../components/MUI/Stack";
import Sidebar from "../../components/Sidebar";

const AccountTitleFormPage = ({ slug }: { slug: string }) => {
  const props = useAccountTitleForm(slug);

  return (
    <>
      <Head>
        <title>Account Title Form</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0}>
        <Sidebar />
        <AccountTitleFormBody props={props} sidebarEnabled />
      </RowStack>
    </>
  );
};

AccountTitleFormPage.getInitialProps = async ({
  query,
}: {
  query: { slug: string };
}) => {
  return { slug: query.slug };
};

export default AccountTitleFormPage;
