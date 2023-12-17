export default class CumulatedTurnoverStats {
  year: number;
  month: number;
  total: number;
  constructor(year: number, month: number, total: number) {
    this.year = year;
    this.month = month;
    this.total = total;
  }
}
