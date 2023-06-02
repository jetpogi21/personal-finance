import { useRouter } from "next/router";
import { useGlobalContext } from "../../contexts/Global";
import { BasicModel, BreadcrumbLink } from "../../interfaces/GeneralInterfaces";
import usePromiseAll from "../usePromiseAll";
import { useEffect, useState } from "react";
import {
  AccountTitleFormModel,
  AccountTitleFormModelForSubmission,
  AccountTitleModel,
} from "../../interfaces/AccountTitleInterfaces";
import axiosClient from "../../utils/api";

const useAccountTitleForm = (slug: string) => {
  const router = useRouter();

  //From global context
  const { openSnackbar, setPageLoading } = useGlobalContext();

  const normalBalances: BasicModel[] = [
    { id: "Debit", name: "Debit" },
    { id: "Credit", name: "Credit" },
  ];
  const {
    data,
    loading: isRequiredListLoading,
    error: promiseAllError,
  } = usePromiseAll({});

  promiseAllError && console.log(promiseAllError);
  const requiredListObject: TRequiredList = {
    normalBalances,
    isRequiredListLoading,
  };

  const [accountTitle, setAccountTitle] = useState<AccountTitleModel | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mainListObject: TMainListObject = { accountTitle, loading, error };

  const fetchAccountTitle = async () => {
    setLoading(true);
    try {
      const { data } = await axiosClient.get(`account-titles/${slug}`);
      if (data.status === "success") {
        console.log(
          "🚀 ~ file: useAccountTitleForm.ts:48 ~ fetchAccountTitle ~ data:",
          data
        );
        setAccountTitle(data.data);
        setLoading(false);
      }
    } catch (error) {
      setError(error as string);
    }
  };

  useEffect(() => {
    if (slug !== "new") {
      fetchAccountTitle();
    }
  }, [slug]);

  const formInitialValues: AccountTitleFormModel = {
    account_title: "",
    normal_balance: "Debit",
    id: "",
    SubAccountTitles: [],
  };
  if (accountTitle) {
    for (const key in formInitialValues) {
      if (
        accountTitle.hasOwnProperty(key) &&
        formInitialValues.hasOwnProperty(key)
      ) {
        //@ts-ignore
        //prettier-ignore
        formInitialValues[key] = accountTitle[key] === null ? "" : accountTitle[key];
      }
    }

    //Edit the id and name to match the id and name of the list
    formInitialValues.SubAccountTitles = accountTitle.SubAccountTitles.map(
      (item) => ({
        sub_account_title: item.sub_account_title,
        account_title_id: item.account_title_id.toString(),
        id: item.id.toString(),
        checked: false,
        touched: false,
      })
    );
  }
  formInitialValues.SubAccountTitles.push({
    sub_account_title: "",
    account_title_id: accountTitle ? accountTitle.id.toString() : "",
    id: "",
    checked: false,
    touched: false,
  });
  const [deletedSubAccountTitles, setDeletedSubAccountTitles] = useState<
    number[]
  >([]);

  const breadCrumbCaption = accountTitle ? accountTitle.account_title : "New";
  const breadcrumbLinks: BreadcrumbLink[] = [
    { href: "/account-titles", caption: "Account Title List" },
    {
      href: `/account-titles/${slug}`,
      caption: breadCrumbCaption,
    },
  ];

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (values: AccountTitleFormModel) => {
    setPageLoading(true);

    //Method,URL and message depending on whether the method is add or edit.
    let url: string, method: string, message: string;

    if (!accountTitle) {
      url = `/account-titles/`;
      method = "post";
      message = "added";
    } else {
      url = `/account-titles/${accountTitle.id}`;
      method = "put";
      message = "updated";
    }

    const newValues = JSON.parse(
      JSON.stringify(values)
    ) as AccountTitleFormModelForSubmission;

    newValues.deletedSubAccountTitles = deletedSubAccountTitles;
    newValues.SubAccountTitles = newValues.SubAccountTitles.filter(
      (item) => item.touched
    );

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
        openSnackbar(`Account Title ${message} successfully..`);
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
    console.log({ accountTitle });
    if (accountTitle) {
      axiosClient
        .delete(`/account-titles/${accountTitle.id}`)
        .then(({ data }) => {
          setFormError(data.status === "error" ? data.error : null);
          if (data.status === "success") {
            openSnackbar(`Account Title deleted successfully..`);
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
    setDeletedSubAccountTitles,
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
  accountTitle: AccountTitleModel | null;
  loading: boolean;
  error: string | null;
};

export type TAccountTitleFormHook = ReturnType<typeof useAccountTitleForm>;

export type TRequiredList = {
  normalBalances: BasicModel[];
  isRequiredListLoading: boolean;
};

export default useAccountTitleForm;
