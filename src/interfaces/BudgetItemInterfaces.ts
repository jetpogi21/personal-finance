import { BasicModel, ListQuery } from "./GeneralInterfaces";

export interface BudgetItemModel {id: number;
budget_id: number;
category: "Workday" | "Monthly" | "Weekly";
amount: string;
description: string;
type: "Income" | "Expense";
Budget: Budget}

interface Budget{budget_year: number;
budget_month: number;
id: number;
BudgetItems: BudgetItem[]}

export interface BudgetItemFormModel {id: string;
budget_id: string;
category: "Workday" | "Monthly" | "Weekly";
amount: string;
description: string;
type: "Income" | "Expense"}

export interface BudgetItemFormModelForSubmission extends BudgetItemFormModel {}

export interface BudgetItemFilterFormDefaultValue {[key: string]: unknown
}

export interface BudgetItemURLQuery extends ListQuery {
}
