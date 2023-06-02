import { SelectChangeEvent } from "@mui/material";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  BudgetItemURLQuery,
  BudgetItemFilterFormDefaultValue,
  BudgetItemModel,
} from "../../interfaces/BudgetItemInterfaces";
import {
  BasicModel,
  SortPair,
  NameCaption,
  SortOptions,
} from "../../interfaces/GeneralInterfaces";
import axiosClient from "../../utils/api";
import {
  getFilterValueFromURL,
  getParamsObject,
  getSortedBy,
  modifySort,
  modifyLimit,
  getFirstItem,
  getAxiosParams,
  supplyMissingNames,
} from "../../utils/utilities";
import usePromiseAll from "../usePromiseAll";
import { useToggle } from "../useToggle";

const useBudgetItems = (query: Partial<BudgetItemURLQuery>) => {
const router = useRouter();
const categories: BasicModel[]=[{id: "Workday",name: "Workday"},{id: "Monthly",name: "Monthly"},{id: "Weekly",name: "Weekly"}];
const types: BasicModel[]=[{id: "Income",name: "Income"},{id: "Expense",name: "Expense"}];
const { data, loading: isRequiredListLoading, error: promiseAllError, } = usePromiseAll({budgets: "/budgets"});



promiseAllError && console.log(promiseAllError);
const requiredListObject: TRequiredList = { categories,types,budgets,isRequiredListLoading };
const filterFormDefaultValue: BudgetItemFilterFormDefaultValue = { }
//Reshape the initial values of the filter form depending on the URL queries
const filterFormInitialValue: BudgetItemFilterFormDefaultValue = getFilterValueFromURL(query,filterFormDefaultValue);
//This will supply the name key for each array of objects
const handleFilterFormSubmit = (values: BudgetItemFilterFormDefaultValue) => {
  const params = getParamsObject(
    values,
    filterFormDefaultValue
  ) as Partial<BudgetItemURLQuery>;
  router.push({ pathname: router.pathname, query: params });
};

const handleFilterFormReset = (formik: FormikProps<any>) => {
  formik.resetForm({
    values: filterFormDefaultValue,
  });
  router.push({ pathname: router.pathname });
};
const formikObject: TFormikFilterFormObject = { filterFormDefaultValue, filterFormInitialValue, handleFilterFormSubmit, handleFilterFormReset}
const sortedBy: SortPair = getSortedBy(query, ["id","asc"]);
const sortList: NameCaption[] = [];
const sortOptions: SortOptions = { sortedBy, list: sortList };

const handleBudgetItemSort = (name: string) => modifySort(name, sortOptions, router, query);

const handleBudgetItemLimitChange = (event: SelectChangeEvent<string>) => modifyLimit(event.target.value, router, query);

const sortAndLimitObject = { limit: getFirstItem(query.limit, "20"),sortOptions, handleBudgetItemSort, handleBudgetItemLimitChange };
const [budgetItems, setBudgetItems] = useState<BudgetItemModel[]>([]);
const [gridLoading, setGridLoading] = useState(true);
const [recordCount, setRecordCount] = useState(0);

const fetchBudgetItems = async () => {
  setGridLoading(true);

  try {
    const { data } = await axiosClient.get("/budget-items/", {
      params: {
        ...getAxiosParams(query, filterFormDefaultValue),
        page: query.page,
        limit: query.limit,
        sort: query.sort,
      },
    });

    const rows = data.data.rows || data.data;
    const count = data.data.count || data.totalRecordCount;
    setBudgetItems(rows || []);
    setRecordCount(count || 0);

  } catch (error) {
    console.error(error);
  } finally {
    setGridLoading(false);
  }
};

useEffect(() => {
  fetchBudgetItems();
}, [query]);

const mainListObject = { budgetItems, gridLoading, recordCount}
const { toggle: isFilterFormShown, handleToggle: toggleFilterForm } = useToggle();
const toggleObject = { isFilterFormShown, toggleFilterForm };
const breadCrumbLinks = [{href: "/budget-items", caption: "Budget Item List"}];
return { requiredListObject, sortAndLimitObject, mainListObject, formikObject, toggleObject, breadCrumbLinks};};
export type TMainListObject = {budgetItems: BudgetItemModel[]; gridLoading: boolean; recordCount: number;};
export type TFormikFilterFormObject = { filterFormDefaultValue: BudgetItemFilterFormDefaultValue; filterFormInitialValue: BudgetItemFilterFormDefaultValue; handleFilterFormSubmit: (values: BudgetItemFilterFormDefaultValue) => void; handleFilterFormReset: (formik: FormikProps<any>) => void; };
export type TBudgetItemsHook = ReturnType<typeof useBudgetItems>;
export type TRequiredList = { categories: BasicModel[];
types: BasicModel[];
budgets: BasicModel[];
isRequiredListLoading : boolean };
export default useBudgetItems;
