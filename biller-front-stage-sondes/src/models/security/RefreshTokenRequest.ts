export default class RefreshTokenRequest {
  refreshToken: string;
  constructor(refreshToken: string) {
    this.refreshToken = refreshToken;
  }
}
