export default class GoogleCalendarNoId {
  // id?: number;
  googleCalendarId: string;
  backgroundColor: string;
  borderColor: string;
  textColor?: string;
  constructor(
    googleCalendarId: string,
    backgroundColor: string,
    borderColor: string,
    textColor?: string
    // id?: number
  ) {
    //this.id = id;
    this.googleCalendarId = googleCalendarId;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.textColor = textColor;
  }
}
