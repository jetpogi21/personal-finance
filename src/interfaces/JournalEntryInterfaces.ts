import { BasicModel, ListQuery } from "./GeneralInterfaces";

export interface JournalEntryModel {
  id: number;
  date: string;
  note: string | null;
  JournalEntryItems: JournalEntryItem[];
}

interface JournalEntryItem {
  id: number;
  journal_entry_id: number;
  sub_account_title_id: number;
  debit_amount: string;
  credit_amount: string;
  SubAccountTitle: SubAccountTitle;
}

interface SubAccountTitle {
  account_title_id: number;
  sub_account_title: string;
  id: number;
  slug: string;
}

export interface JournalEntryFormModel {
  id: string;
  date: string;
  note: string;
  JournalEntryItems: {
    id: string;
    journal_entry_id: string;
    sub_account_title_id: string;
    debit_amount: string;
    credit_amount: string;
    checked: boolean;
    touched: boolean;
  }[];
}

export interface JournalEntryFormModelForSubmission
  extends JournalEntryFormModel {
  deletedJournalEntryItems: number[];
}

export interface JournalEntryFilterFormDefaultValue {
  q: string;
  start_date: string;
  end_date: string;
  sub_account_title: BasicModel[];
  [key: string]: unknown;
}

export interface JournalEntryURLQuery extends ListQuery {
  q: string;
  start_date: string;
  end_date: string;
  sub_account_title: string;
}
