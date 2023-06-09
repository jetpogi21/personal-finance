import { SelectChangeEvent } from "@mui/material";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  BudgetTemplateURLQuery,
  BudgetTemplateFilterFormDefaultValue,
  BudgetTemplateModel,
} from "../../interfaces/BudgetTemplateInterfaces";
import {
  BasicModel,
  SortPair,
  NameCaption,
  SortOptions,
  SortOptionsAsString,
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
  modifySortAsString,
} from "../../utils/utilities";
import usePromiseAll from "../usePromiseAll";
import { useToggle } from "../useToggle";

const useBudgetTemplates = (query: Partial<BudgetTemplateURLQuery>) => {
  const router = useRouter();
  const categories: BasicModel[] = [
    { id: "Workday", name: "Workday" },
    { id: "Monthly", name: "Monthly" },
    { id: "Weekly", name: "Weekly" },
  ];
  const types: BasicModel[] = [
    { id: "Income", name: "Income" },
    { id: "Expense", name: "Expense" },
  ];
  const {
    data,
    loading: isRequiredListLoading,
    error: promiseAllError,
  } = usePromiseAll({});

  promiseAllError && console.log(promiseAllError);
  const requiredListObject: TRequiredList = {
    categories,
    types,
    isRequiredListLoading,
  };
  const filterFormDefaultValue: BudgetTemplateFilterFormDefaultValue = {
    category: "all",
    q: "",
    type: "all",
  };
  //Reshape the initial values of the filter form depending on the URL queries
  const filterFormInitialValue: BudgetTemplateFilterFormDefaultValue =
    getFilterValueFromURL(query, filterFormDefaultValue);
  //This will supply the name key for each array of objects
  const handleFilterFormSubmit = (
    values: BudgetTemplateFilterFormDefaultValue
  ) => {
    const params = getParamsObject(
      values,
      filterFormDefaultValue
    ) as Partial<BudgetTemplateURLQuery>;
    router.push({ pathname: router.pathname, query: params });
  };

  const handleFilterFormReset = (formik: FormikProps<any>) => {
    formik.resetForm({
      values: filterFormDefaultValue,
    });
    router.push({ pathname: router.pathname });
  };
  const formikObject: TFormikFilterFormObject = {
    filterFormDefaultValue,
    filterFormInitialValue,
    handleFilterFormSubmit,
    handleFilterFormReset,
  };
  //Generated by GenerateClientModelSortLimit

  //Generated by GenerateClientSortOptions
  const sortedBy = getSortedBy(query, "id");
  const sortOptions: SortOptionsAsString = {
    sortedBy,
    sortObject: { id: { caption: "Most Recent", asc: "id", desc: "-id" } },
  };

  const handleBudgetTemplateSort = (name: string) =>
    modifySortAsString(name, sortOptions, router, query);

  const handleBudgetTemplateLimitChange = (event: SelectChangeEvent<string>) =>
    modifyLimit(event.target.value, router, query);

  const sortAndLimitObject = {
    limit: getFirstItem(query.limit, "20"),
    sortOptions,
    handleBudgetTemplateSort,
    handleBudgetTemplateLimitChange,
  };
  const [budgetTemplates, setBudgetTemplates] = useState<BudgetTemplateModel[]>(
    []
  );
  const [gridLoading, setGridLoading] = useState(true);
  const [recordCount, setRecordCount] = useState(0);

  const fetchBudgetTemplates = async () => {
    setGridLoading(true);

    try {
      const { data } = await axiosClient.get("/budget-templates/", {
        params: {
          ...getAxiosParams(query, filterFormDefaultValue),
          page: query.page,
          limit: query.limit,
          sort: query.sort,
        },
      });

      const rows = data.data.rows || data.data;
      const count = data.data.count || data.totalRecordCount;
      setBudgetTemplates(rows || []);
      setRecordCount(count || 0);
    } catch (error) {
      console.error(error);
    } finally {
      setGridLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetTemplates();
  }, [query]);

  const mainListObject = { budgetTemplates, gridLoading, recordCount };
  const { toggle: isFilterFormShown, handleToggle: toggleFilterForm } =
    useToggle();
  const toggleObject = { isFilterFormShown, toggleFilterForm };
  const breadCrumbLinks = [
    { href: "/budget-templates", caption: "Budget Template List" },
  ];

  return {
    requiredListObject,
    sortAndLimitObject,
    mainListObject,
    formikObject,
    toggleObject,
    breadCrumbLinks,
  };
};
export type TMainListObject = {
  budgetTemplates: BudgetTemplateModel[];
  gridLoading: boolean;
  recordCount: number;
};
export type TFormikFilterFormObject = {
  filterFormDefaultValue: BudgetTemplateFilterFormDefaultValue;
  filterFormInitialValue: BudgetTemplateFilterFormDefaultValue;
  handleFilterFormSubmit: (
    values: BudgetTemplateFilterFormDefaultValue
  ) => void;
  handleFilterFormReset: (formik: FormikProps<any>) => void;
};
export type TBudgetTemplatesHook = ReturnType<typeof useBudgetTemplates>;
export type TRequiredList = {
  categories: BasicModel[];
  types: BasicModel[];
  isRequiredListLoading: boolean;
};
export default useBudgetTemplates;
