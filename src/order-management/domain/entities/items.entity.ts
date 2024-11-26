import { Entity } from 'src/__lib__/entity';

interface Attributes {
  id?: string;
  name: string;
  description: string;
  price: number;
  type: 'rental-agreement' | 'doorstep-delivery' | 'e-signature';
  deliveryAddress?: string;
  eSignatureLandlordEmail?: string;
  eSignatureTenantEmail?: string;
  eSignatureLandlordPhone?: string;
  eSignatureTenantPhone?: string;
  rentalAgreementId?: string;
}

export class ItemEntity extends Entity<Attributes> {
  private id?: string;
  private name: string;
  private description: string;
  private price: number;
  private type: 'rental-agreement' | 'doorstep-delivery' | 'e-signature';
  private deliveryAddress?: string;
  private eSignatureLandlordEmail?: string;
  private eSignatureTenantEmail?: string;
  private eSignatureLandlordPhone?: string;
  private eSignatureTenantPhone?: string;
  private rentalAgreementId?: string;

  constructor(attributes: Attributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
    this.price = attributes.price;
    this.type = attributes.type;
    this.deliveryAddress = attributes.deliveryAddress;
    this.eSignatureLandlordEmail = attributes.eSignatureLandlordEmail;
    this.eSignatureTenantEmail = attributes.eSignatureTenantEmail;
    this.eSignatureLandlordPhone = attributes.eSignatureLandlordPhone;
    this.eSignatureTenantPhone = attributes.eSignatureTenantPhone;
    this.rentalAgreementId = attributes.rentalAgreementId;
  }
}
