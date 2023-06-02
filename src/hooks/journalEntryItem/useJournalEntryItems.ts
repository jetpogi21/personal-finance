import { SelectChangeEvent } from "@mui/material";
import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  JournalEntryItemURLQuery,
  JournalEntryItemFilterFormDefaultValue,
  JournalEntryItemModel,
} from "../../interfaces/JournalEntryItemInterfaces";
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
} from "../../utils/utilities";
import usePromiseAll from "../usePromiseAll";
import { useToggle } from "../useToggle";
const useJournalEntryItems = (query: Partial<JournalEntryItemURLQuery>) => {
const router = useRouter();

const { data, loading: isRequiredListLoading, error: promiseAllError, } = usePromiseAll({journalEntries: "/journal-entries",
subAccountTitles: "/sub-account-titles"});


const assertedSubAccountTitles = data.subAccountTitles as SubAccountTitleModel[];
const subAccountTitles = assertedSubAccountTitles?.map((item) => ({
  id: item.id,
  name: item.sub_account_title,
})) as BasicModel[];

promiseAllError && console.log(promiseAllError);
const requiredListObject: TRequiredList = { journalEntries,subAccountTitles,isRequiredListLoading };

const sortedBy: SortPair = getSortedBy(query, ["id","asc"]);
const sortList: NameCaption[] = [{ name: "id", caption: "Most Recent"}];
const sortOptions: SortOptions = { sortedBy, list: sortList };

const handleJournalEntryItemSort = (name: string) => modifySort(name, sortOptions, router, query);

const handleJournalEntryItemLimitChange = (event: SelectChangeEvent<string>) => modifyLimit(event.target.value, router, query);

const sortAndLimitObject = { limit: getFirstItem(query.limit, "20"),sortOptions, handleJournalEntryItemSort, handleJournalEntryItemLimitChange };
const [journalEntryItems, setJournalEntryItems] = useState<JournalEntryItemModel[]>([]);
const [gridLoading, setGridLoading] = useState(true);
const [recordCount, setRecordCount] = useState(0);

const fetchJournalEntryItems = async () => {
  setGridLoading(true);

  try {
    const { data } = await axiosClient.get("/journal-entry-items/", {
      params: {
        ...getAxiosParams(query, filterFormDefaultValue),
        page: query.page,
        limit: query.limit,
        sort: query.sort,
      },
    });

    const rows = data.data.rows || data.data;
    const count = data.data.count || data.totalRecordCount;
    setJournalEntryItems(rows || []);
    setRecordCount(count || 0);

  } catch (error) {
    console.error(error);
  } finally {
    setGridLoading(false);
  }
};

useEffect(() => {
  fetchJournalEntryItems();
}, [query]);

const mainListObject = { journalEntryItems, gridLoading, recordCount}
const { toggle: isFilterFormShown, handleToggle: toggleFilterForm } = useToggle();
const toggleObject = { isFilterFormShown, toggleFilterForm };
const breadCrumbLinks = [{href: "/journal-entry-items", caption: "Journal Entry Item List"}];
return { requiredListObject, sortAndLimitObject, mainListObject, formikObject, toggleObject, breadCrumbLinks};};
export type TMainListObject = {journalEntryItems: JournalEntryItemModel[]; gridLoading: boolean; recordCount: number;};
export type TFormikFilterFormObject = { filterFormDefaultValue: JournalEntryItemFilterFormDefaultValue; filterFormInitialValue: JournalEntryItemFilterFormDefaultValue; handleFilterFormSubmit: (values: JournalEntryItemFilterFormDefaultValue) => void; handleFilterFormReset: (formik: FormikProps<any>) => void; };
export type TJournalEntryItemsHook = ReturnType<typeof useJournalEntryItems>;
export type TRequiredList = { journalEntries: BasicModel[];
subAccountTitles: BasicModel[];
isRequiredListLoading : boolean };
export default useJournalEntryItems;
