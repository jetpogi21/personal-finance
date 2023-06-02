import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import {
  SortObject,
  SortOptions,
  SortOptionsAsString,
} from "../../interfaces/GeneralInterfaces";
import { useRouter } from "next/router";

interface SortMenuProps {
  sortOptions: SortOptionsAsString;
  modifySort: (name: string) => void;
}

const SortIcon = (sortDirection: any) => {
  return (
    <ListItemIcon sx={{ color: "white" }}>
      {sortDirection === "desc" ? (
        <ArrowDownwardIcon sx={{ ml: "auto" }} fontSize="small" />
      ) : (
        <ArrowUpwardIcon sx={{ ml: "auto" }} fontSize="small" />
      )}
    </ListItemIcon>
  );
};

const SortMenu = ({ sortOptions, modifySort }: SortMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { sortObject, sortedBy } = sortOptions;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const maxLength = Math.max(
    ...Object.values(sortObject).map((item) => item.caption.length)
  );

  //Get the current sort caption..
  const sortOptionName =
    Object.keys(sortObject).find(
      (item) =>
        sortObject[item].asc === sortedBy || sortObject[item].desc === sortedBy
    ) || Object.keys(sortObject)[0];
  const sortList = sortOptions.sortObject;
  const sortDirection =
    sortObject[sortOptionName].asc === sortedBy ? "asc" : "desc";

  const currentCaption = sortList[sortOptionName].caption;

  return (
    <Box>
      <Button
        id="basic-button"
        variant="contained"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
      >
        {currentCaption}
        {SortIcon(sortDirection)}
        {/* <SortIcon sortDirection={sortDirection} /> */}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Object.keys(sortObject).map((item) => (
          <MenuItem
            onClick={() => {
              modifySort(item);
              setAnchorEl(null);
            }}
            key={item}
          >
            <ListItemText sx={{ width: `${maxLength}ch` }}>
              {sortObject[item].caption}
            </ListItemText>
            {sortOptions.sortedBy[0] === item && (
              <ListItemIcon>
                {sortOptions.sortedBy[1] === "desc" ? (
                  <ArrowDownwardIcon sx={{ ml: "auto" }} fontSize="small" />
                ) : (
                  <ArrowUpwardIcon sx={{ ml: "auto" }} fontSize="small" />
                )}
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SortMenu;
