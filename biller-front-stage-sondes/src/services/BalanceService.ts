import Movement from "../models/Balance/Movement";
import AuthenticationService from "./AuthenticationService";
import configData from "../config.json";

export default class BalanceService {
  static async saveMovement(mvt: Movement): Promise<Movement> {
    return fetch(configData.BACKEND_URL + `movement/`, {
      method: "POST",
      body: JSON.stringify(mvt),
      headers: {
        "Content-Type": "application/json",
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async deleteMovement(id: number): Promise<boolean | void> {
    return fetch(configData.BACKEND_URL + `movement/${id}`, {
      method: "DELETE",
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.status === 200)
      .catch((error) => this.handleError(error));
  }

  static async getMovement(id: number): Promise<Movement> {
    return fetch(configData.BACKEND_URL + `movement/${id}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getMovements(): Promise<Movement[]> {
    return fetch(configData.BACKEND_URL + `movement/`, {
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
