export default class InvoiceMail {
  recipient?: string;
  subject?: string;
  body?: string;
  constructor(recipient: string, subject: string, body: string) {
    this.recipient = recipient;
    this.subject = subject;
    this.body = body;
  }
}
