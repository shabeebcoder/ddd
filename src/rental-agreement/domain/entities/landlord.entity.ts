import { Entity } from 'src/__lib__/entity';

type Identification =
  | 'adhar'
  | 'pan'
  | 'passport'
  | 'voterId'
  | 'drivingLicense';
type Person = 'individual' | 'company' | 'parnership';

interface Attributes {
  address: string;
  identificationNumber: string;
  identificationType: Identification;
  landlordName: string;
  type: Person;
}

export class LandlordEntity extends Entity<Attributes> {
  address: string;
  identificationNumber: string;
  identificationType: Identification;
  landlordName: string;
  type: Person;

  constructor(attributes: Attributes) {
    super();
    this.address = attributes.address;
    this.identificationNumber = attributes.identificationNumber;
    this.identificationType = attributes.identificationType;
    this.landlordName = attributes.landlordName;
    this.type = attributes.type;
  }
}
