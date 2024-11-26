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
  name: string;
  type: Person;
}

export class TenantEntity extends Entity<Attributes> {
  address: string;
  identificationNumber: string;
  identificationType: Identification;
  name: string;
  type: Person;

  constructor(attributes: Attributes) {
    super();
    this.address = attributes.address;
    this.identificationNumber = attributes.identificationNumber;
    this.identificationType = attributes.identificationType;
    this.name = attributes.name;
    this.type = attributes.type;
  }
}
