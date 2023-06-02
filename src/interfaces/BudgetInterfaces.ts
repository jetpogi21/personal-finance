import { BasicModel, ListQuery } from "./GeneralInterfaces";

export interface BudgetModel {
  budget_year: number;
  budget_month: number;
  id: number;
  BudgetItems: BudgetItem[];
}

interface BudgetItem {
  id: number;
  budget_id: number;
  category: "Workday" | "Monthly" | "Weekly";
  amount: string;
  description: string;
  type: "Income" | "Expense";
}

export interface BudgetFormModel {
  budget_year: string;
  budget_month: string;
  id: string;
  BudgetItems: {
    id: string;
    budget_id: string;
    category: string;
    amount: string;
    description: string;
    type: string;
    checked: boolean;
    touched: boolean;
  }[];
}

export interface BudgetFormModelForSubmission extends BudgetFormModel {
  deletedBudgetItems: number[];
}

export interface BudgetFilterFormDefaultValue {
  year: string;
  month: string;
  [key: string]: unknown;
}

export interface BudgetURLQuery extends ListQuery {
  year: string;
  month: string;
}
