import React from "react";
import { ColumnStack, RowStack } from "./MUI/Stack";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaUserAlt } from "react-icons/fa";
import { FiLayers } from "react-icons/fi";
import { AiFillBook } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import { RiFileCopyLine } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  type SidebarLinkProps = {
    href: string;
    menuCaption: string;
    IconComponent: React.ReactNode;
  };

  const SidebarLink: React.FC<SidebarLinkProps> = ({
    href,
    menuCaption,
    IconComponent,
  }) => {
    console.log({ currentPath });
    return (
      <RowStack
        component={Link}
        href={href}
        className={`${
          href === "/"
            ? href === currentPath
              ? "active"
              : ""
            : currentPath.includes(href)
            ? "active"
            : ""
        }
        `}
        alignItems={"center"}
        justifyContent={{ xs: "center", sm: "flex-start" }}
      >
        {IconComponent}
        <Typography>{menuCaption}</Typography>
      </RowStack>
    );
  };

  return (
    <ColumnStack
      p={2}
      flex={{ xs: "0 0 5px", sm: "0 0 250px" }}
      flexShrink={0}
      height={"100vh"}
    >
      <Box
        fontSize={"1.25rem"}
        display={"flex"}
        textAlign={"center"}
        fontWeight={"bold"}
        alignSelf={"center"}
        p={{ xs: 0, sm: 2 }}
      >
        <Box display={{ xs: "block", sm: "none" }}>PF</Box>
        <Box display={{ xs: "none", sm: "block" }}>Personal Finance</Box>
      </Box>
      <ColumnStack
        flex={1}
        sx={{
          "& p": {
            display: {
              xs: "none",
              sm: "flex",
            },
          },
          "& a": {
            transition: "color 0.3s ease, background-color 0.3s ease",
            textDecoration: "none",
            color: "grey.700",
            p: 1,
            borderRadius: 1,
            "& svg": {
              color: "black",
            },
            "& p": {
              fontWeight: "bold",
            },
            "&.active, :hover": {
              bgcolor: "black",
              color: "white",
              "& svg": {
                color: "white",
              },
            },
          },
        }}
      >
        <SidebarLink
          href="/"
          menuCaption="Dashboard"
          IconComponent={<AiOutlineDashboard fontSize={"1.2rem"} />}
        />
        <SidebarLink
          href="/account-titles"
          menuCaption="Account Titles"
          IconComponent={<FaUserAlt />}
        />
        <SidebarLink
          href="/sub-account-titles"
          menuCaption="Sub Account Titles"
          IconComponent={<FiLayers />}
        />
        <SidebarLink
          href="/journal-entries"
          menuCaption="Journal Entries"
          IconComponent={<AiFillBook />}
        />
        <SidebarLink
          href="/budgets"
          menuCaption="Budgets"
          IconComponent={<BsGraphUp />}
        />
        <SidebarLink
          href="/budget-templates"
          menuCaption="Budget Templates"
          IconComponent={<RiFileCopyLine />}
        />
      </ColumnStack>
    </ColumnStack>
  );
};

export default Sidebar;
