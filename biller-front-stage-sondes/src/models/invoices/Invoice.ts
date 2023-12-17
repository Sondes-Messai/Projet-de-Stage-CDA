import Customer from "../Customers/Customer";
import InvoiceDetail from "./InvoiceDetail";

export default class Invoice {
  id?: number;
  invoiceRef?: string;
  customer?: Customer;
  purchaseOrder?: string;
  amount: number;
  emittedOn?: string;
  dueOn?: string;
  paidOn?: string;
  paymentMethod: number;
  taxe: boolean;
  details?: InvoiceDetail[];
  constructor(
    amount: number = 0,
    paymentMethod: number = 1,
    taxe: boolean = false
  ) {
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.taxe = taxe;
  }
}
