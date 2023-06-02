import { BudgetFormModel, BudgetModel } from "../interfaces/BudgetInterfaces";
import { formatCurrency, parseAsValidFloat } from "./utilities";

//Helper functions
export function countFridaysInMonth(month: string, year: string): number {
  if (month === "" || year === "") {
    return 0;
  }
  const monthIdInt = parseInt(month);
  const yearInt = parseInt(year);

  // Convert 1-based month to 0-based month
  const adjustedMonth = monthIdInt - 1;

  // Create a new Date object for the given month and year
  const date = new Date(yearInt, adjustedMonth, 1);

  // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayOfWeek = date.getDay();

  // Calculate the number of days in the month
  const daysInMonth = new Date(yearInt, adjustedMonth + 1, 0).getDate();

  // Calculate the number of Fridays based on the first day of the month
  let fridayCount = firstDayOfWeek <= 5 ? 1 : 0;

  // Calculate the number of remaining Fridays based on the number of days in the month
  const remainingDays = daysInMonth - (7 - firstDayOfWeek);
  fridayCount += Math.floor(remainingDays / 7);

  return fridayCount;
}

export function countFridaysInRange(
  startDate: string,
  endDate: string
): number {
  if (startDate === "" || endDate === "") {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Ensure start date is before or equal to end date
  if (start > end) {
    return 0;
  }

  let fridayCount = 0;
  const currentDate = new Date(start);

  while (currentDate <= end) {
    // Check if the current day is a Friday (5 = Friday)
    if (currentDate.getDay() === 5) {
      fridayCount++;
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return fridayCount;
}

export function getWeekdayCount(monthId: string, year: string) {
  if (monthId === "" || year === "") {
    return 0;
  }

  const monthIdInt = parseInt(monthId);
  const yearInt = parseInt(year);
  const firstDay = new Date(yearInt, monthIdInt - 1, 1);
  const lastDay = new Date(yearInt, monthIdInt, 0);

  const daysInMonth = lastDay.getDate();
  let weekdayCount = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(yearInt, monthIdInt - 1, day);
    const currentDayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on

    // Check if the current day is a weekday (Monday to Friday) and after the first day of the week
    if (
      currentDayOfWeek >= 1 &&
      currentDayOfWeek <= 5 &&
      currentDate >= firstDay
    ) {
      weekdayCount++;
    }
  }

  return weekdayCount;
}

export function getWeekdayCountInRange(startDate: string, endDate: string) {
  if (startDate === "" || endDate === "") {
    return 0;
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  // Ensure start date is before or equal to end date
  if (start > end) {
    return 0;
  }

  let weekdayCount = 0;
  const currentDate = new Date(start);

  while (currentDate <= end) {
    const currentDayOfWeek = currentDate.getDay(); // Sunday is 0, Monday is 1, and so on

    // Check if the current day is a weekday (Monday to Friday)
    if (currentDayOfWeek >= 1 && currentDayOfWeek <= 5) {
      weekdayCount++;
    }
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekdayCount;
}

const calculateRowTotal = (
  category: string,
  amount: string,
  workDayMultiplier: number,
  weeklyMultiplier: number
): number => {
  const parsedAmount = parseAsValidFloat(amount) ?? 0;

  switch (category) {
    case "Workday":
      return workDayMultiplier * parsedAmount;
    case "Monthly":
      return parsedAmount;
    case "Weekly":
      return weeklyMultiplier * parsedAmount;
    default:
      return 0;
  }
};

interface IncomeExpenseAndRowTotals {
  totalExpectedIncome: number;
  totalBudgetedExpense: number;
  rowTotals: string[];
}

export function getIncomeExpenseAndRowTotals(
  items: BudgetFormModel["BudgetItems"] | BudgetModel["BudgetItems"],
  workDayMultiplier: number,
  weeklyMultiplier: number
): IncomeExpenseAndRowTotals {
  let totalExpectedIncome: number = 0;
  let totalBudgetedExpense: number = 0;
  const rowTotals: string[] = items.map((item) => {
    const rowTotal = calculateRowTotal(
      item.category,
      item.amount,
      workDayMultiplier,
      weeklyMultiplier
    );

    if (item.type === "Income") {
      totalExpectedIncome += rowTotal;
    } else {
      totalBudgetedExpense += rowTotal;
    }

    return formatCurrency(rowTotal);
  });

  return { totalExpectedIncome, totalBudgetedExpense, rowTotals };
}
