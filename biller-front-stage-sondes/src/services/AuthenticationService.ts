import User from "../models/security/User";
import LoginRequest from "../models/security/LoginRequest";
import LoginResponse from "../models/security/LoginResponse";
import configData from "../config.json";
import RefreshTokenRequest from "../models/security/RefreshTokenRequest";

export default class AuthenticationService {
  static async call(login: LoginRequest): Promise<LoginResponse | undefined> {
    const response = await fetch(configData.BACKEND_URL + `auth/signin`, {
      method: "POST",
      body: JSON.stringify(login),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      return await response.json();
    }
  }

  static async login(username: string, password: string): Promise<boolean> {
    await this.call(new LoginRequest(username, password)).then((response) => {
      if (response !== undefined) {
        localStorage.setItem("jwt", response.jwt);
        localStorage.setItem("expiration", response.expiration);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("reloaded", "false");
        localStorage.setItem("refreshToken", response.refreshToken);
      }
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.isAuthenticated());
      }, 1000);
    });
  }

  static logout(): void {
    localStorage.removeItem("jwt");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  }

  static async getNewToken(
    refreshToken: string
  ): Promise<LoginResponse | undefined> {
    return await fetch(configData.BACKEND_URL + `auth/refreshtoken`, {
      method: "POST",
      body: JSON.stringify(new RefreshTokenRequest(refreshToken)),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response && response.json())
      .catch((error) => this.handleError(error));
  }

  static isAuthenticated(refreshSession: boolean = true): boolean {
    const expiration = localStorage.getItem("expiration");
    const jwt = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refreshToken");

    if (
      expiration != null &&
      Date.parse(expiration) > Date.now() &&
      jwt != null
    ) {
      // close to expiration ? renew the token
      if (
        refreshSession &&
        Date.parse(expiration) - Date.now() < 300000 &&
        refreshToken !== null
      ) {
        try {
          this.getNewToken(refreshToken)?.then((data) => {
            if (data !== undefined) {
              localStorage.setItem("expiration", data.expiration);
              localStorage.setItem("jwt", data.jwt);
              localStorage.setItem("refreshToken", data.refreshToken);
            }
          });
        } catch {}
      }

      return localStorage.getItem("jwt") !== undefined;
    } else {
      localStorage.removeItem("jwt");
      localStorage.removeItem("expiration");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      if (localStorage.getItem("reloaded") !== "true") {
        window.location.reload();
        localStorage.setItem("reloaded", "true");
      }
      return false;
    }
  }

  static async isStarted(): Promise<boolean> {
    try {
      if ((await fetch(configData.BACKEND_URL + "ping")).ok) {
        return true;
      } else {
        await this.delay(1000);
        return this.isStarted();
      }
    } catch {
      await this.delay(1000);
      return this.isStarted();
    }
  }

  static getUser(): User {
    const user = localStorage.getItem("user");
    return user !== null ? JSON.parse(user) : null;
  }

  static getJwt(refreshSession: boolean = true): any {
    this.isAuthenticated(refreshSession);
    return localStorage.getItem("jwt");
  }

  static delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static handleError(error: Error): void {
    console.error(error);

    throw error;
  }
}
