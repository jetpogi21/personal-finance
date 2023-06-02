import { useRouter } from "next/router";
import { useGlobalContext } from "../../contexts/Global";
import { BasicModel, BreadcrumbLink } from "../../interfaces/GeneralInterfaces";
import usePromiseAll from "../usePromiseAll";
import { useEffect, useState } from "react";
import {
  BudgetItemFormModel,
  BudgetItemFormModelForSubmission,
  BudgetItemModel,
} from "../../interfaces/BudgetItemInterfaces";
import axiosClient from "../../utils/api";
import { convertDateToYYYYMMDD } from "../../utils/utilities";


const useBudgetItemForm = (id: string) => {
  const router = useRouter();

  //From global context
  const { openSnackbar, setPageLoading } = useGlobalContext();

  const categories: BasicModel[]=[{id: "Workday",name: "Workday"},{id: "Monthly",name: "Monthly"},{id: "Weekly",name: "Weekly"}];
const types: BasicModel[]=[{id: "Income",name: "Income"},{id: "Expense",name: "Expense"}];
const { data, loading: isRequiredListLoading, error: promiseAllError, } = usePromiseAll({budgets: "/budgets"});



promiseAllError && console.log(promiseAllError);
const requiredListObject: TRequiredList = { categories,types,budgets,isRequiredListLoading };

  const [budgetItem, setBudgetItem] = useState<BudgetItemModel | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

const mainListObject: TMainListObject = { budgetItem, loading, error };

const fetchBudgetItem = async () => {
  setLoading(true);
  try {
    const { data } = await axiosClient.get(`budget-items/${id}`);
    if (data.status === "success") {
      setBudgetItem(data.data);
      setLoading(false);
    }
  } catch (error) {
    setError(error as string);
  }
};

useEffect(() => {
  if (id !== "new") {
    fetchBudgetItem();
  }
}, [id]);

  const formInitialValues: BudgetItemFormModel = {id: "",
budget_id: budgets && budgets.length > 0 ? budgets[0].id.toString() : "",
category: "Workday",
amount: "",
description: "",
type: "Income"};
if (budgetItem) {
  for (const key in formInitialValues) {
    if (budgetItem.hasOwnProperty(key) && formInitialValues.hasOwnProperty(key)) {
      //@ts-ignore
      //prettier-ignore
      formInitialValues[key] = budgetItem[key] === null ? "" : budgetItem[key];
    }
  }

  
}

  const breadCrumbCaption = budgetItem ? budgetItem.id : "New";
const breadcrumbLinks: BreadcrumbLink[] = [
  { href: "/budget-items", caption: "Budget Item List" },
  {
    href: `/budget-items/${id}`,
    caption: breadCrumbCaption,
  },
];

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (values: BudgetItemFormModel) => {
    setPageLoading(true);
  
    //Method,URL and message depending on whether the method is add or edit.
    let url: string, method: string, message: string;
  
    if (!budgetItem) {
      url = `/budget-items/`;
      method = "post";
      message = "added";
    } else {
      url = `/budget-items/${budgetItem.id}`;
      method = "put";
      message = "updated";
    }
  
    const newValues = JSON.parse(
      JSON.stringify(values)
    ) as BudgetItemFormModelForSubmission;
  
    
  
    
    
  
    //dont forget to add any deleted Ids of the children object.
    try {
      const { data } = await axiosClient({
        method,
        url,
        data: newValues,
      });
  
      //if error then store the top level error
      setFormError(data.status === "error" ? data.error : null);
      if (data.status === "success") {
        openSnackbar(`Budget Item ${message} successfully..`);
        //TO DO: go back to the previous page. push the previous page.
        router.back();
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setPageLoading(false);
    }
  };

  const handleDelete = () => {
  if (budgetItem) {
    axiosClient
      .delete(`/budget-items/${budgetItem.id}`)
      .then(({ data }) => {
        setFormError(data.status === "error" ? data.error : null);
        if (data.status === "success") {
          openSnackbar(`Budget Item deleted successfully..`);
          router.back();
        }
      })
      .finally(() => {
        setPageLoading(false);
        handleCloseDialog();
      });
  }
};

  const handleCancelClick = () => {
    router.back();
  };

  const formHandlers = { handleSubmit, handleDelete, handleCancelClick  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialog = () => setOpenDialog(true);

  const dialogObject = { openDialog, handleCloseDialog, handleOpenDialog };

  return {
    requiredListObject,
    mainListObject,
    formInitialValues,
    breadcrumbLinks,
    dialogObject,
    formHandlers,
    formError,
  };
};

export type TMainListObject = {
  budgetItem: BudgetItemModel | null;
  loading: boolean;
  error: string | null;
};

export type TBudgetItemFormHook = ReturnType<typeof useBudgetItemForm>;

export type TRequiredList = { categories: BasicModel[];
types: BasicModel[];
budgets: BasicModel[];
isRequiredListLoading : boolean };

export default useBudgetItemForm
