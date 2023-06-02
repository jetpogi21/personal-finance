import Typography from "@mui/material/Typography";
import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import MUILink from "@mui/material/Link";
import { BreadcrumbLink } from "../../interfaces/GeneralInterfaces";

interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

const Breadcrumbs = ({ links }: BreadcrumbsProps): JSX.Element => {
  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      sx={{ p: 2, borderBottom: 1, borderColor: "lightgray" }}
    >
      {links.map((item, index) =>
        index === links.length - 1 ? (
          <Typography key={item.href} color="text.primary">
            {item.caption}
          </Typography>
        ) : (
          <MUILink
            component={Link}
            href={item.href}
            key={item.href}
            sx={{ textDecoration: "none" }}
          >
            {item.caption}
          </MUILink>
        )
      )}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
