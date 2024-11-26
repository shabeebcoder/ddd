import { Entity } from 'src/__lib__/entity';

interface Attributes {
  address: string;
  numberOfPeopleOwning: number;
}

export class PropertyEntity extends Entity<Attributes> {
  address: string;
  numberOfPeopleOwning: number;

  constructor(attributes: Attributes) {
    super();
    this.address = attributes.address;
    this.numberOfPeopleOwning = attributes.numberOfPeopleOwning;
  }
}
