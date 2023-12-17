import Service from "../models/services/Service";
import AuthenticationService from "./AuthenticationService";
import configData from "../config.json";

export default class ServiceService {
  static async saveService(service: Service): Promise<Service> {
    return fetch(configData.BACKEND_URL + `service/`, {
      method: "POST",
      body: JSON.stringify(service),
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getService(id: number): Promise<Service> {
    return fetch(configData.BACKEND_URL + `service/${id}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async lock(id: number): Promise<Service> {
    return fetch(configData.BACKEND_URL + `service/${id}?lock=true`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async unlock(id: number): Promise<Service> {
    return fetch(configData.BACKEND_URL + `service/${id}?lock=false`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getServices(): Promise<Service[]> {
    return fetch(configData.BACKEND_URL + `service/`, {
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
