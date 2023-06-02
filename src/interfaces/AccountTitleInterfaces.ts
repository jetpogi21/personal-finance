export interface AccountTitleModel {
  account_title: string;
  normal_balance: "Debit" | "Credit";
  id: number;
  slug: string;
  SubAccountTitles: SubAccountTitle[];
}

interface SubAccountTitle {
  account_title_id: number;
  sub_account_title: string;
  id: number;
  slug: string;
}

export interface AccountTitleFormModel {
  account_title: string;
  normal_balance: "Debit" | "Credit";
  id: string;
  SubAccountTitles: {
    account_title_id: string;
    sub_account_title: string;
    id: string;
    checked: boolean;
    touched: boolean;
  }[];
}

export interface AccountTitleFormModelForSubmission
  extends AccountTitleFormModel {
  deletedSubAccountTitles: number[];
}

export interface AccountTitleFilterFormDefaultValue {
  nb: string;
  q: string;
  [key: string]: unknown;
}

export interface AccountTitleURLQuery {
  nb: string;
  q: string;
  page: string;
  limit: string;
  sort: string;
}
