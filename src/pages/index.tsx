import Head from "next/head";
import { ColumnStack, RowStack } from "../components/MUI/Stack";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/dashboard/Dashboard";
import { SCROLLBAR_STYLES } from "../utils/constants";

export default function DashboardPage() {
  return (
    <>
      <Head>
        <title>Journal Entry List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <RowStack gap={0} height={"100vh"} width={"100vw"}>
        <Sidebar />
        <ColumnStack
          flex={1}
          bgcolor={"grey.100"}
          p={{ xs: 2, md: 2 }}
          sx={{ overflowY: "auto", ...SCROLLBAR_STYLES }}
        >
          <Dashboard />
        </ColumnStack>
      </RowStack>
    </>
  );
}
