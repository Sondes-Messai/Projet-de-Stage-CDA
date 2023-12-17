import MonthlyTurnoverStats from "../models/statistics/MonthlyTurnoverStats";
import PendingStats from "../models/statistics/PendingStats";
import TurnoverStats from "../models/statistics/TurnoverStats";
import AuthenticationService from "./AuthenticationService";
import configData from "../config.json";
import CumulatedTaxe from "../models/statistics/CumulatedTaxe";

export default class StatsService {
  static async getPending(): Promise<PendingStats> {
    return fetch(configData.BACKEND_URL + `stats/pending/`, {
      headers: {
        authorization: AuthenticationService.getJwt(false),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getTurnover(year: number): Promise<TurnoverStats> {
    return fetch(configData.BACKEND_URL + `stats/turnover/${year}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getMonthlyTurnover(
    year: number
  ): Promise<MonthlyTurnoverStats[]> {
    return fetch(configData.BACKEND_URL + `stats/turnover/monthly/${year}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getActiveCustomers(year: number): Promise<number> {
    return fetch(configData.BACKEND_URL + `stats/customer/active/${year}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getNewCustomers(year: number): Promise<number> {
    return fetch(configData.BACKEND_URL + `stats/customer/new/${year}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getTaxe(year: number, month: number): Promise<CumulatedTaxe> {
    return fetch(configData.BACKEND_URL + `stats/taxe/${year}/${month}`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static handleError(error: Error): Promise<any> {
    console.error(error);
    throw error;
  }
}
