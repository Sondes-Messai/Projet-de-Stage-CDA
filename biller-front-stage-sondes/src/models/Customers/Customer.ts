export default class Customer {
  id?: number;
  name: string;
  address: string;
  zip: string;
  town: string;
  phone: string;
  mobile?: string;
  website: string;
  email: string;
  billed?: number;
  paid?: number;
  confidence?: number = -1;
  constructor(
    name: string = "",
    address: string = "",
    zip: string = "",
    town: string = "",
    phone: string = "",
    website: string = "",
    email: string = "",
    mobile?: string
  ) {
    this.name = name;
    this.address = address;
    this.zip = zip;
    this.town = town;
    this.phone = phone;
    this.website = website;
    this.email = email;
    this.mobile = mobile;
  }
}
