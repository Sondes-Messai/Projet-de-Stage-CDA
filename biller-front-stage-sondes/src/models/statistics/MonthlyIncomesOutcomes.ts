export default class MonthlyIncomesOutcomes {
  year: number;
  month: number;
  incomes: number = 0;
  outcomes: number = 0;
  constructor(year: number, month: number, incomes: number, outcomes: number) {
    this.year = year;
    this.month = month;
    this.incomes = incomes;
    this.outcomes = outcomes;
  }
}
