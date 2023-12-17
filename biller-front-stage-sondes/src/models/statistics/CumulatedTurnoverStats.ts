import Point from "./Point";

export default class CumulatedTurnoverStats {
  id: string;
  data: Point[];
  constructor(id: string, data: Point[]) {
    this.id = id;
    this.data = data;
  }
}
