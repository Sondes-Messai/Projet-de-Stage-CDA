import Invoice from "../models/invoices/Invoice";
import InvoiceMail from "../models/invoices/InvoiceMail";
import fileDownload from "js-file-download";
import AuthenticationService from "./AuthenticationService";
import configData from "../config.json";

export default class InvoiceService {
  static async saveInvoice(invoice: Invoice): Promise<Invoice> {
    return fetch(configData.BACKEND_URL + `invoice/`, {
      method: "POST",
      body: JSON.stringify(invoice),
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getInvoice(id: number): Promise<Invoice> {
    return fetch(configData.BACKEND_URL + `invoice/${id}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getInvoices(): Promise<Invoice[]> {
    return fetch(configData.BACKEND_URL + `invoice/`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async publishInvoice(id: number, mail: InvoiceMail): Promise<Invoice> {
    return fetch(configData.BACKEND_URL + `invoice/publish/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
      body: JSON.stringify(mail),
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async payInvoice(id: number, paidOn: string): Promise<Invoice> {
    return fetch(configData.BACKEND_URL + `invoice/pay/${id}?date=${paidOn}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static printInvoice(id: number) {
    fetch(configData.BACKEND_URL + `invoice/print/${id}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    }).then((response) => {
      const contentDisposition = response.headers.get("Content-Disposition");

      const filename = contentDisposition?.split("filename=")[1];
      response.blob().then((blob) => {
        return fileDownload(blob, filename ? filename : "temp.pdf");
      });
    });
  }

  static async deleteInvoice(id: number): Promise<boolean | void> {
    return fetch(configData.BACKEND_URL + `invoice/${id}`, {
      method: "DELETE",
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.status === 200)
      .catch((error) => this.handleError(error));
  }

  static handleError(error: Error): void {
    console.error(error);

    throw error;
  }

  static async unpaidInvoice(id: number, mail: InvoiceMail): Promise<Invoice> {
    return fetch(configData.BACKEND_URL + `invoice/unpaid/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
      body: JSON.stringify(mail),
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }
}
