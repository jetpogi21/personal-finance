export interface JournalEntryItemModel {id: number;
journal_entry_id: number;
sub_account_title_id: number;
debit_amount: number;
credit_amount: number;
JournalEntry: JournalEntry;
SubAccountTitle: SubAccountTitle}

interface JournalEntry{id: number;
date: string;
note: string | null;
JournalEntryItems: JournalEntryItem[]}
interface SubAccountTitle{account_title_id: number;
sub_account_title: string;
id: number;
slug : string;
AccountTitle: AccountTitle;
JournalEntryItems: JournalEntryItem[]}

export interface JournalEntryItemFormModel {id: string;
journal_entry_id: journalEntries[0];
sub_account_title_id: subAccountTitles[0];
debit_amount: string;
credit_amount: string;
checked: boolean;
touched: boolean}

export interface JournalEntryItemFormModelForSubmission extends Record<"JournalEntryItems",JournalEntryItemFormModel[]>{ deletedJournalEntryItems: number[]; }

export interface JournalEntryItemFilterFormDefaultValue {q: string;
sub_account_title: BasicModel[];
[key: string]: unknown
}

export interface JournalEntryItemURLQuery {q: string;
sub_account_title: string;
page: string;
limit: string;
sort: string
}
