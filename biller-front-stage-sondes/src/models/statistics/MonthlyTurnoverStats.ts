export default class MonthlyTurnoverStats {
  year: number;
  month: number;
  real: number;
  estimated: number;
  previousYear: number;
  tax: number;
  constructor(
    year: number,
    month: number,
    real: number,
    estimated: number,
    previousYear: number,
    tax: number
  ) {
    this.year = year;
    this.month = month;
    this.real = real;
    this.estimated = estimated;
    this.previousYear = previousYear;
    this.tax = tax;
  }
}
