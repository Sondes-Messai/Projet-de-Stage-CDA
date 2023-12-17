import Turnover from "../models/statistics/Turnover";

class Point {
  x: string;
  y: number;
  constructor(x: string, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Serie {
  id: string;
  data: Point[];
  constructor(name: string) {
    this.id = name;
    this.data = [];
  }
}

const toSeries = (input: Turnover[]): Serie[] => {
  const realTurnoverSerie: Serie = new Serie("realTurnover");
  const estimatedTurnoverSerie: Serie = new Serie("estimatedTurnover");
  const previousTurnoverSerie: Serie = new Serie("previousTurnover");
  let result: Serie[];

  input.forEach((data) => {
    if (data.realTurnover !== undefined)
      realTurnoverSerie.data.push(
        new Point(data.month.toString(), data.realTurnover)
      );
  });

  input.forEach((data) => {
    if (data.estimatedTurnover !== undefined)
      estimatedTurnoverSerie.data.push(
        new Point(data.month.toString(), data.estimatedTurnover)
      );
  });
  input.forEach((data) => {
    if (data.previousTurnover !== undefined)
      previousTurnoverSerie.data.push(
        new Point(data.month.toString(), data.previousTurnover)
      );
  });

  result = [previousTurnoverSerie, estimatedTurnoverSerie, realTurnoverSerie];
  console.log(result);

  return result;
};

export default toSeries;
