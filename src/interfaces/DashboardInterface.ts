export interface DashboardQuery {
  start_date?: string;
  end_date?: string;
}

export interface DashboardMovementQuery extends DashboardQuery {
  id?: string;
}

export interface TotalIncomeAndExpenseResult {
  totalIncome: string;
  totalExpense: string;
}

export interface TotalAssetsAndLiabilitiesResult {
  totalAssets: string;
  totalLiabilities: string;
}

export interface TotalPerExpenseResult {
  amount: string;
  sub_account_title_id: number;
  SubAccountTitle: {
    sub_account_title: string;
  };
}

export interface BalanceMovementResult {
  date: string;
  amount: string;
}
