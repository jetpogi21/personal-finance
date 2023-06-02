import { BasicModel, ListQuery } from "./GeneralInterfaces";

export interface SubAccountTitleModel {
  account_title_id: number;
  sub_account_title: string;
  id: number;
  slug: string;
  AccountTitle: AccountTitle;
}

interface AccountTitle {
  account_title: string;
  normal_balance: "Debit" | "Credit";
  id: number;
  slug: string;
}

export interface SubAccountTitleFormModel {
  account_title_id: string;
  sub_account_title: string;
  id: string;
  checked: boolean;
  touched: boolean;
}

export interface SubAccountTitleFormModelForSubmission
  extends SubAccountTitleFormModel {
  deletedJournalEntryItems: number[];
}

export interface SubAccountTitleFilterFormDefaultValue {
  q: string;
  account_title_id: string;
  [key: string]: unknown;
}

export interface SubAccountTitleURLQuery extends ListQuery {
  q: string;
  account_title_id: string;
}
