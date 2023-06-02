import { BasicModel } from "../interfaces/GeneralInterfaces";

export const SCROLLBAR_STYLES = {
  "&::-webkit-scrollbar": {
    width: "0.3rem",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    backgroundColor: "grey.600",
  },
};

export const HORIZONTAL_SCROLLBAR_STYLES = {
  "&::-webkit-scrollbar": {
    height: "0.3rem",
  },
  "&::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    backgroundColor: "grey.300",
  },
};

export const monthsModel: BasicModel[] = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];
