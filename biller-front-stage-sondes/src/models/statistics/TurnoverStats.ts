export default class TurnoverStats {
  total: number;
  previousYearTotal: number;
  net: number;
  previousYearNet: number;
  constructor(
    total: number,
    previousYearTotal: number,
    net: number,
    previousYearNet: number
  ) {
    this.total = total;
    this.previousYearTotal = previousYearTotal;
    this.net = net;
    this.previousYearNet = previousYearNet;
  }
}
