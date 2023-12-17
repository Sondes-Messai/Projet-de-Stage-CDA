export default class CompanySettings {
  firstname: string;
  lastname: string;
  tradename?: string;
  address: string;
  zip: string;
  town: string;
  phoneNumber: string;
  duns: string = "";
  constructor(
    firstname: string,
    lastname: string,
    address: string,
    zip: string,
    town: string,
    phoneNumber: string,
    duns: string,
    tradename?: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.tradename = tradename;
    this.address = address;
    this.zip = zip;
    this.town = town;
    this.phoneNumber = phoneNumber;
    this.duns = duns;
  }
}
