import { useRouter } from "next/router";
import { useGlobalContext } from "../../contexts/Global";
import { BasicModel, BreadcrumbLink } from "../../interfaces/GeneralInterfaces";
import usePromiseAll from "../usePromiseAll";
import { useEffect, useState } from "react";
import {
  JournalEntryFormModel,
  JournalEntryFormModelForSubmission,
  JournalEntryModel,
} from "../../interfaces/JournalEntryInterfaces";
import axiosClient from "../../utils/api";
import { convertDateToYYYYMMDD, truncateString } from "../../utils/utilities";
import { SubAccountTitleModel } from "../../interfaces/SubAccountTitleInterfaces";

const useJournalEntryForm = (id: string) => {
  const router = useRouter();

  //From global context
  const { openSnackbar, setPageLoading } = useGlobalContext();

  const {
    data,
    loading: isRequiredListLoading,
    error: promiseAllError,
  } = usePromiseAll({ subAccountTitles: "/sub-account-titles" });

  const assertedSubAccountTitles =
    data.subAccountTitles as SubAccountTitleModel[];
  const subAccountTitles = assertedSubAccountTitles?.map((item) => ({
    id: item.id,
    name: item.sub_account_title,
  })) as BasicModel[];

  promiseAllError && console.log(promiseAllError);
  const requiredListObject: TRequiredList = {
    subAccountTitles,
    isRequiredListLoading,
  };

  const [journalEntry, setJournalEntry] = useState<JournalEntryModel | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mainListObject: TMainListObject = { journalEntry, loading, error };

  const fetchJournalEntry = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`journal-entries/${id}`);
      if (data.status === "success") {
        setJournalEntry(data.data);
        setLoading(false);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      fetchJournalEntry();
    }
  }, [id]);

  const formInitialValues: JournalEntryFormModel = {
    id: "",
    date: convertDateToYYYYMMDD(new Date()),
    note: "",
    JournalEntryItems: [],
  };
  if (journalEntry) {
    for (const key in formInitialValues) {
      if (
        journalEntry.hasOwnProperty(key) &&
        formInitialValues.hasOwnProperty(key)
      ) {
        //@ts-ignore
        //prettier-ignore
        formInitialValues[key] = journalEntry[key] === null ? "" : journalEntry[key];
      }
    }

    //Edit the id and name to match the id and name of the list
    formInitialValues.JournalEntryItems = journalEntry.JournalEntryItems.map(
      (item) => ({
        id: item.id.toString(),
        journal_entry_id: item.journal_entry_id.toString(),
        sub_account_title_id: item.sub_account_title_id.toString(),
        debit_amount: item.debit_amount,
        credit_amount: item.credit_amount,
        checked: false,
        touched: false,
      })
    );
  }

  formInitialValues.JournalEntryItems.push({
    id: "",
    journal_entry_id: journalEntry ? journalEntry.id.toString() : "",
    sub_account_title_id: "",
    debit_amount: "0.00",
    credit_amount: "0.00",
    checked: false,
    touched: false,
  });
  const [deletedJournalEntryItems, setDeletedJournalEntryItems] = useState<
    number[]
  >([]);

  const breadCrumbCaption = journalEntry
    ? journalEntry.note
      ? truncateString(journalEntry.note, 50)
      : journalEntry.id
    : "New";
  const breadcrumbLinks: BreadcrumbLink[] = [
    { href: "/journal-entries", caption: "Journal Entry List" },
    {
      href: `/journal-entries/${id}`,
      caption: breadCrumbCaption,
    },
  ];

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (values: JournalEntryFormModel) => {
    setPageLoading(true);

    //Method,URL and message depending on whether the method is add or edit.
    let url: string, method: string, message: string;

    if (!journalEntry) {
      url = `/journal-entries/`;
      method = "post";
      message = "added";
    } else {
      url = `/journal-entries/${journalEntry.id}`;
      method = "put";
      message = "updated";
    }

    const newValues = JSON.parse(
      JSON.stringify(values)
    ) as JournalEntryFormModelForSubmission;

    newValues.deletedJournalEntryItems = deletedJournalEntryItems;
    newValues.JournalEntryItems = newValues.JournalEntryItems.filter(
      (item) => item.touched
    );

    //dont forget to add any deleted Ids of the children object.
    try {
      const { data } = await axiosClient({
        method,
        url,
        data: newValues,
      });

      console.log({ data });

      //if error then store the top level error
      setFormError(data.status === "error" ? data.error : null);
      if (data.status === "success") {
        openSnackbar(`Journal Entry ${message} successfully..`);
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
    if (journalEntry) {
      axiosClient
        .delete(`/journal-entries/${journalEntry.id}`)
        .then(({ data }) => {
          setFormError(data.status === "error" ? data.error : null);
          if (data.status === "success") {
            openSnackbar(`Journal Entry deleted successfully..`);
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

  const formHandlers = {
    handleSubmit,
    handleDelete,
    handleCancelClick,
    setDeletedJournalEntryItems,
  };

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
  journalEntry: JournalEntryModel | null;
  loading: boolean;
  error: string | null;
};

export type TJournalEntryFormHook = ReturnType<typeof useJournalEntryForm>;

export type TRequiredList = {
  subAccountTitles: BasicModel[];
  isRequiredListLoading: boolean;
};

export default useJournalEntryForm;
