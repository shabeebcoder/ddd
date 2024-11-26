import { LandlordEntity } from './landlord.entity';
import { PropertyEntity } from './proeprty.entity';
import { TenantEntity } from './tenant.entity';
import { Aggregate } from 'src/__lib__/aggregate';

interface Attributes {
  placeOfAgreement: string;
  state: string;
  propertyAddress: string;
  tenancyStartDate: string;
  dayOfMonthPayment: number;
  securityDeposit: number;
  numberOfPeopleOwningProperty: number;
  numberOfTenants: number;
  tenant: TenantEntity;
  landlord: LandlordEntity;
  property: PropertyEntity;
}

export class RentalAgreementEntity extends Aggregate<Attributes> {
  private placeOfAgreement: string;
  private state: string;
  private tenancyStartDate: Date;
  private dayOfMonthPayment: number;
  private securityDeposit: number;
  private numberOfTenants: number;
  private status:
    | 'draft'
    | 'signed'
    | 'terminated'
    | 'cancelled'
    | 'expired'
    | 'active'
    | 'pending';
  private tenant: TenantEntity;
  private landlord: LandlordEntity;
  private property: PropertyEntity;

  constructor(attributes: Attributes) {
    super();
    this.placeOfAgreement = attributes.placeOfAgreement;
    this.state = attributes.state;
    this.tenancyStartDate = new Date(attributes.tenancyStartDate);
    this.dayOfMonthPayment = attributes.dayOfMonthPayment;
    this.securityDeposit = attributes.securityDeposit;
    this.numberOfTenants = attributes.numberOfTenants;
    this.status = 'draft';
    this.tenant = attributes.tenant;
    this.landlord = attributes.landlord;
    this.property = attributes.property;
  }

  signAgreement() {
    this.status = 'signed';
  }

  paymentComplete() {
    // TODO: Implement payment gateway integration
    // once payment is complete, change status to active till agreement is signed
    if (this.status === 'draft') {
      this.status = 'pending';
    }
  }
}
