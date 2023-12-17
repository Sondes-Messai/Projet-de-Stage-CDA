import Customer from "../models/Customers/Customer";
import AuthenticationService from "./AuthenticationService";
import configData from "../config.json";

export default class CustomerService {
  static async saveCustomer(cust: Customer): Promise<Customer> {
    return fetch(configData.BACKEND_URL + `customer/`, {
      method: "POST",
      body: JSON.stringify(cust),
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getCustomer(id: number): Promise<Customer> {
    return fetch(configData.BACKEND_URL + `customer/${id}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getCustomers(): Promise<Customer[]> {
    return fetch(configData.BACKEND_URL + `customer/`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static handleError(error: Error): void {
    console.error(error);

    throw error;
  }
}
