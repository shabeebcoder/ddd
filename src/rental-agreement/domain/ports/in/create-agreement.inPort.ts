import { RentalAgreementEntity } from '../../entities/rental-agreement.entity';

type Identification =
  | 'adhar'
  | 'pan'
  | 'passport'
  | 'voterId'
  | 'drivingLicense';
type Person = 'individual' | 'company' | 'parnership';

// This is the input port for the use case of creating a rental agreement.
interface CreateAgreementParams {
  state: string;
  propertyAddress: string;
  tenancyStartDate: string;
  dayOfMonthPayment: number;
  securityDeposit: number;
  typeOfLandlord: Person;
  numberOfPeopleOwningProperty: number;
  landlordName: string;
  landloardIdentification: Identification;
  landlordIdentificationNumber: string;
  landlordAddress: string;
  typeOfTenant: Person;
  numberOfTenants: number;
  tenantName: string;
  tenantIdentification: Identification;
  tenantIdentificationNumber: string;
}

export abstract class CreateAgreementInPort {
  abstract execute(
    createAgreementParams: CreateAgreementParams,
  ): Promise<RentalAgreementEntity>;
}
