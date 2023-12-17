export default class Service {
  id?: number;
  designation: string;
  price: number;
  from: string;
  to?: string;
  constructor(
    designation: string = "",
    price: number = 0.0,
    from: string = Date.now().toString()
  ) {
    this.designation = designation;
    this.price = price;
    this.from = from;
  }
}
