import {
  AppBar,
  Stack,
  Toolbar,
  Typography,
  Link as MUILink,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import { Dispatch, SetStateAction, useState } from "react";

function isLinkActive(componentHref: string, routerHref: string) {
  return routerHref === componentHref;
}

type NavbarLinkProps = {
  href: string;
  routerHref: string;
  caption: string;
  setIsMenuShown: Dispatch<SetStateAction<boolean>>;
  router: NextRouter;
};

const NavbarLink = ({
  href,
  routerHref,
  caption,
  setIsMenuShown,
  router,
}: NavbarLinkProps) => {
  return isLinkActive(href, routerHref) ? (
    <Typography
      component={"span"}
      sx={{
        p: 1,
        color: "grey.600",
        fontWeight: 500,
        textDecoration: "none",
      }}
    >
      {caption}
    </Typography>
  ) : (
    <Typography
      color={"white"}
      component={Link}
      href={href}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        router.push(href);
        setIsMenuShown(false);
      }}
      sx={{
        p: 1,
        color: "grey.600",
        textDecoration: "none",
        borderRadius: 1,
        fontWeight: 500,
        "&:hover": { bgcolor: "rgba(60,64,67,0.078)" },
      }}
    >
      {caption}
    </Typography>
  );
};

const Navbar = () => {
  const router = useRouter();
  const routerHref = router.pathname;

  const [isMenuShown, setIsMenuShown] = useState(false);

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        color: "grey.900",
        borderBottom: 1,
        borderColor: "grey.200",
        transition: "all 0.3s ease-in-out",
        height: { xs: isMenuShown ? "100vh" : "64px", md: "64px" },
        overflowY: "hidden",
      }}
    >
      <Stack
        direction="row"
        maxWidth={"xl"}
        sx={{ width: "100%", "& .MuiToolbar-root": { px: 2 } }}
        mx="auto"
      >
        <Toolbar
          sx={{
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
          }}
        >
          <Stack direction="row" sx={{ p: { xs: 1 }, alignItems: "center" }}>
            <Typography variant="h6" component="div" sx={{ flex: 1 }}>
              My Personal Finance
            </Typography>
            <IconButton
              aria-label=""
              onClick={() => setIsMenuShown(!isMenuShown)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            sx={{
              transition: "all 0.3s ease-in-out",
              height: { xs: isMenuShown ? "100vh" : 0, md: "auto" },
              overflowY: "hidden",
              pb: { xs: isMenuShown ? 2 : 0, md: 0 },
              ml: { xs: 0, md: "auto" },
            }}
          >
            <NavbarLink
              href="/account-titles"
              routerHref={routerHref}
              caption="Account Titles"
              setIsMenuShown={setIsMenuShown}
              router={router}
            />
            <NavbarLink
              href="/sub-account-titles"
              routerHref={routerHref}
              caption="Sub Account Titles"
              setIsMenuShown={setIsMenuShown}
              router={router}
            />
            <NavbarLink
              href="/journal-entries"
              routerHref={routerHref}
              caption="Journal Entries"
              setIsMenuShown={setIsMenuShown}
              router={router}
            />
          </Stack>
        </Toolbar>
      </Stack>
    </AppBar>
  );
};

export default Navbar;
