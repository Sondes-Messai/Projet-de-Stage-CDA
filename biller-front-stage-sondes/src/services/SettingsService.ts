import AuthenticationService from "./AuthenticationService";
import configData from "../config.json";
import GoogleCalendarNoId from "../models/settings/GoogleCalendarNoId";
import CompanySettings from "../models/settings/CompanySettings";

export default class SettingsService {
  static async getDetails(): Promise<CompanySettings> {
    return fetch(configData.BACKEND_URL + `settings/`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async getCalendars(): Promise<GoogleCalendarNoId[]> {
    return fetch(configData.BACKEND_URL + `settings/calendar`, {
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    })
      .then((response) => response.json())
      .catch((error) => this.handleError(error));
  }

  static async upload(file: File): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    await fetch(configData.BACKEND_URL + `settings/upload`, {
      method: "PUT",
      body: formData,
      headers: {
        authorization: AuthenticationService.getJwt(),
      },
    });
  }

  static async save(company: CompanySettings): Promise<CompanySettings> {
    console.log(JSON.stringify(company));

    return await fetch(configData.BACKEND_URL + `settings/`, {
      method: "POST",
      body: JSON.stringify(company),
      headers: {
        "Content-Type": "application/json",
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
