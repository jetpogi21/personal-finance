import { ListQuery } from "./GeneralInterfaces";

export interface BudgetTemplateModel {id: number;
category: "Workday" | "Monthly" | "Weekly";
amount: string;
description: string;
type: "Income" | "Expense" | null}



export interface BudgetTemplateFormModel {id: string;
category: "Workday" | "Monthly" | "Weekly";
amount: string;
description: string;
type: "Income" | "Expense" | "";
checked: boolean;
touched: boolean}

export interface BudgetTemplateFormModelForSubmission extends Record<"BudgetTemplates",BudgetTemplateFormModel[]>{ deletedBudgetTemplates: number[]; }

export interface BudgetTemplateFilterFormDefaultValue {q: string;
category: string;
type: string;
[key: string]: unknown
}

export interface BudgetTemplateURLQuery extends ListQuery {q: string;
category: string;
type: string
}
