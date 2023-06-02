import { useRouter } from "next/router";
import { useGlobalContext } from "../../contexts/Global";
import usePromiseAll from "../usePromiseAll";
import { useState } from "react";
import {
  JournalEntryItemFormModel,
  JournalEntryItemFormModelForSubmission,
  JournalEntryItemModel,
} from "../../interfaces/JournalEntryItemInterfaces";
import axiosClient from "../../utils/api";
import { FormikHelpers } from "formik";
import { BasicModel } from "../../interfaces/GeneralInterfaces";

const useJournalEntryItemForm = (journalEntryItems: JournalEntryItemModel[] | null) => {
  const router = useRouter();

  //From global context
  const { openSnackbar, setPageLoading } = useGlobalContext();

  
const { data, loading: isRequiredListLoading, error: promiseAllError, } = usePromiseAll({journalEntries: "/journal-entries",
subAccountTitles: "/sub-account-titles"});


const assertedSubAccountTitles = data.subAccountTitles as SubAccountTitleModel[];
const subAccountTitles = assertedSubAccountTitles?.map((item) => ({
  id: item.id,
  name: item.sub_account_title,
})) as BasicModel[];

promiseAllError && console.log(promiseAllError);
const requiredListObject: TRequiredList = { journalEntries,subAccountTitles,isRequiredListLoading };

  const formInitialValues: Record<"JournalEntryItems", JournalEntryItemFormModel[]> = {
  JournalEntryItems: journalEntryItems
    ? journalEntryItems.map((item) => {
        return {
          id: item.id.toString(),
journal_entry_id: item.journal_entry_id.toString(),
sub_account_title_id: item.sub_account_title_id.toString(),
debit_amount: item.debit_amount.toString(),
credit_amount: item.credit_amount.toString(),
          touched: false,
          checked: false,
        };
      })
    : [],
};

formInitialValues.JournalEntryItems.push({
  id: "",
journal_entry_id: journalEntries && journalEntries.length > 0 ? journalEntries[0].id.toString() : "",
sub_account_title_id: subAccountTitles && subAccountTitles.length > 0 ? subAccountTitles[0].id.toString() : "",
debit_amount: "",
credit_amount: "",
  checked: false,
  touched: false,
});

  const [formError, setFormError] = useState<string | null>(null);
  const [deletedJournalEntryItems, setDeletedJournalEntryItems] = useState<number[]>([]);

  const handleSubmit = async (
  values: Record<"JournalEntryItems", JournalEntryItemFormModel[]>,
  { setValues }: FormikHelpers<Record<"JournalEntryItems", JournalEntryItemFormModel[]>>
) => {
  setPageLoading(true);

  const newValues = JSON.parse(
    JSON.stringify(values)
  ) as JournalEntryItemFormModelForSubmission;

  newValues.JournalEntryItems = newValues.JournalEntryItems.filter((item) => item.touched);
  newValues.deletedJournalEntryItems = deletedJournalEntryItems;

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
      url: "/journal-entry-items",
      data: newValues,
    });

    setFormError(data.status === "error" ? data.error : null);
    if (data.status === "success") {
      openSnackbar(`Journal Entry Items updated successfully..`);
      const newJournalEntryItems = values.JournalEntryItems.map((item) => ({
        ...item,
        touched: false,
        id: item.id === "" ? (data.data.createdIds.shift() || "").toString() : item.id,
      }));

      setValues({ ...values, JournalEntryItems: newJournalEntryItems });
      setDeletedJournalEntryItems([]);
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

  const formHandlers = { handleSubmit, handleCancelClick, setDeletedJournalEntryItems };

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

export type TJournalEntryItemFormHook = ReturnType<typeof useJournalEntryItemForm>;

export type TRequiredList = { journalEntries: BasicModel[];
subAccountTitles: BasicModel[];
isRequiredListLoading : boolean };

export default useJournalEntryItemForm;
