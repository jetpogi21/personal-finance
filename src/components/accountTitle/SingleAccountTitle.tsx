import React from "react";
import { AccountTitleModel } from "../../interfaces/AccountTitleInterfaces";
import { Link as MUILink, Stack } from "@mui/material";
import Link from "next/link";

type SingleAccountTitleProp = {
  accountTitle: AccountTitleModel;
};

const SingleAccountTitle: React.FC<SingleAccountTitleProp> = ({
  accountTitle,
}) => {
  console.log(
    "🚀 ~ file: SingleAccountTitle.tsx:13 ~ accountTitle:",
    accountTitle
  );
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      sx={{ height: "100%" }}
    >
      <MUILink
        component={Link}
        href={`/account-titles/${accountTitle.slug}`}
        sx={{
          fontWeight: "bold",
          cursor: "pointer",
          textDecoration: "none",
          color: "inherit",
          p: 2,
        }}
      >
        {accountTitle.account_title}
      </MUILink>
    </Stack>
  );
};

export default SingleAccountTitle;
