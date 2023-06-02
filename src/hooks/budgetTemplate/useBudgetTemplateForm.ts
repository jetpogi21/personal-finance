import { useRouter } from "next/router";
import { useGlobalContext } from "../../contexts/Global";
import usePromiseAll from "../usePromiseAll";
import { useState } from "react";
import {
  BudgetTemplateFormModel,
  BudgetTemplateFormModelForSubmission,
  BudgetTemplateModel,
} from "../../interfaces/BudgetTemplateInterfaces";
import axiosClient from "../../utils/api";
import { FormikHelpers } from "formik";
import { BasicModel } from "../../interfaces/GeneralInterfaces";

const useBudgetTemplateForm = (budgetTemplates: BudgetTemplateModel[] | null) => {
  const router = useRouter();

  //From global context
  const { openSnackbar, setPageLoading } = useGlobalContext();

  const categories: BasicModel[]=[{id: "Workday",name: "Workday"},{id: "Monthly",name: "Monthly"},{id: "Weekly",name: "Weekly"}];
const types: BasicModel[]=[{id: "Income",name: "Income"},{id: "Expense",name: "Expense"}];
const { data, loading: isRequiredListLoading, error: promiseAllError, } = usePromiseAll({});



promiseAllError && console.log(promiseAllError);
const requiredListObject: TRequiredList = { categories,types,isRequiredListLoading };

  const formInitialValues: Record<"BudgetTemplates", BudgetTemplateFormModel[]> = {
  BudgetTemplates: budgetTemplates
    ? budgetTemplates.map((item) => {
        return {
          id: item.id.toString(),
category: item.category,
type: item.type,
amount: item.amount,
description: item.description,
          touched: false,
          checked: false,
        };
      })
    : [],
};

formInitialValues.BudgetTemplates.push({
  id: "",
category: "Workday",
type: "",
amount: "0.00",
description: "",
  checked: false,
  touched: false,
});

  const [formError, setFormError] = useState<string | null>(null);
  const [deletedBudgetTemplates, setDeletedBudgetTemplates] = useState<number[]>([]);

  const handleSubmit = async (
  values: Record<"BudgetTemplates", BudgetTemplateFormModel[]>,
  { setValues }: FormikHelpers<Record<"BudgetTemplates", BudgetTemplateFormModel[]>>
) => {
  setPageLoading(true);

  const newValues = JSON.parse(
    JSON.stringify(values)
  ) as BudgetTemplateFormModelForSubmission;

  newValues.BudgetTemplates = newValues.BudgetTemplates.filter((item) => item.touched);
  newValues.deletedBudgetTemplates = deletedBudgetTemplates;

  try {
    const {
      data,
    }: {
      data: {
        status: "success" | "error";
        data: { createdIds: number[] };
        error: string;
      };
    } = await axiosClient({
      method: "POST",
      url: "/budget-templates",
      data: newValues,
    });

    setFormError(data.status === "error" ? data.error : null);
    if (data.status === "success") {
      openSnackbar(`Budget Templates updated successfully..`);
      const newBudgetTemplates = values.BudgetTemplates.map((item) => ({
        ...item,
        touched: false,
        id: item.id === "" ? (data.data.createdIds.shift() || "").toString() : item.id,
      }));

      setValues({ ...values, BudgetTemplates: newBudgetTemplates });
      setDeletedBudgetTemplates([]);
    }
  } catch (error) {
    console.log({ error });
  } finally {
    setPageLoading(false);
  }
};

  const handleCancelClick = () => {
    router.back();
  };

  const formHandlers = { handleSubmit, handleCancelClick, setDeletedBudgetTemplates };

  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialog = () => setOpenDialog(true);

  const dialogObject = { openDialog, handleCloseDialog, handleOpenDialog };

  return {
    requiredListObject,
    formInitialValues,
    dialogObject,
    formHandlers,
    formError,
  };
};

export type TBudgetTemplateFormHook = ReturnType<typeof useBudgetTemplateForm>;

export type TRequiredList = { categories: BasicModel[];
types: BasicModel[];
isRequiredListLoading : boolean };

export default useBudgetTemplateForm;
