import { useRouter } from "next/router";
import { useGlobalContext } from "../../contexts/Global";
import usePromiseAll from "../usePromiseAll";
import { useState } from "react";
import {
  SubAccountTitleFormModel,
  SubAccountTitleFormModelForSubmission,
  SubAccountTitleModel,
} from "../../interfaces/SubAccountTitleInterfaces";
import axiosClient from "../../utils/api";
import { FormikHelpers } from "formik";
import { BasicModel } from "../../interfaces/GeneralInterfaces";
import { AccountTitleModel } from "../../interfaces/AccountTitleInterfaces";

const useSubAccountTitleForm = (
  subAccountTitles: SubAccountTitleModel[] | null
) => {
  const router = useRouter();

  //From global context
  const { openSnackbar, setPageLoading } = useGlobalContext();

  const {
    data,
    loading: isRequiredListLoading,
    error: promiseAllError,
  } = usePromiseAll({ accountTitles: "/account-titles" });

  const assertedAccountTitles = data.accountTitles as AccountTitleModel[];
  const accountTitles = assertedAccountTitles?.map((item) => ({
    id: item.id,
    name: item.account_title,
  })) as BasicModel[];

  promiseAllError && console.log(promiseAllError);
  const requiredListObject: TRequiredList = {
    accountTitles,
    isRequiredListLoading,
  };

  const formInitialValues: Record<
    "SubAccountTitles",
    SubAccountTitleFormModel[]
  > = {
    SubAccountTitles: subAccountTitles
      ? subAccountTitles.map((item) => {
          return {
            sub_account_title: item.sub_account_title,
            account_title_id: item.account_title_id.toString(),
            id: item.id.toString(),
            touched: false,
            checked: false,
          };
        })
      : [],
  };

  formInitialValues.SubAccountTitles.push({
    sub_account_title: "",
    account_title_id:
      accountTitles && accountTitles.length > 0
        ? accountTitles[0].id.toString()
        : "",
    id: "",
    checked: false,
    touched: false,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [deletedSubAccountTitles, setDeletedSubAccountTitles] = useState<
    number[]
  >([]);

  const handleSubmit = async (
    values: Record<"SubAccountTitles", SubAccountTitleFormModel[]>,
    {
      setValues,
    }: FormikHelpers<Record<"SubAccountTitles", SubAccountTitleFormModel[]>>
  ) => {
    setPageLoading(true);

    const newValues = JSON.parse(
      JSON.stringify(values)
    ) as SubAccountTitleFormModelForSubmission;

    newValues.SubAccountTitles = newValues.SubAccountTitles.filter(
      (item) => item.touched
    );
    newValues.deletedSubAccountTitles = deletedSubAccountTitles;

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
        url: "/sub-account-titles",
        data: newValues,
      });

      setFormError(data.status === "error" ? data.error : null);
      if (data.status === "success") {
        openSnackbar(`Sub Account Titles updated successfully..`);
        const newSubAccountTitles = values.SubAccountTitles.map((item) => ({
          ...item,
          touched: false,
          id:
            item.id === ""
              ? (data.data.createdIds.shift() || "").toString()
              : item.id,
        }));

        setValues({ ...values, SubAccountTitles: newSubAccountTitles });
        setDeletedSubAccountTitles([]);
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

  const formHandlers = {
    handleSubmit,
    handleCancelClick,
    setDeletedSubAccountTitles,
  };

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

export type TSubAccountTitleFormHook = ReturnType<
  typeof useSubAccountTitleForm
>;

export type TRequiredList = {
  accountTitles: BasicModel[];
  isRequiredListLoading: boolean;
};

export default useSubAccountTitleForm;
