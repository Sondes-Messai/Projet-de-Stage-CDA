export default class PendingStats {
  late: number;
  toSend: number;
  total: number;
  constructor(late: number = 0, toSend: number = 0, total: number = 0) {
    this.late = late;
    this.toSend = toSend;
    this.total = total;
  }
}
