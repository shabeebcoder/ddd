import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

type Identification =
  | 'adhar'
  | 'pan'
  | 'passport'
  | 'voterId'
  | 'drivingLicense';
type Person = 'individual' | 'company' | 'parnership';

export class CreateRentalAgreementDto {
  @IsNotEmpty()
  @IsString()
  state: string; // TODO: Add validation for all states in India

  @IsNotEmpty()
  @IsString()
  propertyAddress: string;

  @IsNotEmpty()
  @IsString()
  tenancyStartDate: string; // TODO: Add validation for date format in india

  @IsNotEmpty()
  @IsNumber()
  dayOfMonthPayment: number;

  @IsNotEmpty()
  @IsNumber()
  securityDeposit: number; // TODO: Add validation for security deposit

  @IsNotEmpty()
  @IsString()
  typeOfLandlord: Person; // TODO: Add validation for type of landlord

  @IsNotEmpty()
  @IsNumber()
  numberOfPeopleOwningProperty: number;

  @IsNotEmpty()
  @IsString()
  landlordName: string;

  @IsNotEmpty()
  @IsString()
  landloardIdentification: Identification; // TODO: Add validation for identification

  @IsNotEmpty()
  @IsString()
  landlordIdentificationNumber: string;

  @IsNotEmpty()
  @IsString()
  landlordAddress: string;

  @IsNotEmpty()
  @IsString()
  typeOfTenant: Person; // type Person = 'individual' | 'company' | 'parnership';

  @IsNotEmpty()
  @IsNumber()
  numberOfTenants: number;

  @IsNotEmpty()
  @IsString()
  tenantName: string;

  @IsNotEmpty()
  @IsString()
  tenantIdentification: Identification; // TODO: Add validation for identification

  @IsNotEmpty()
  @IsString()
  tenantIdentificationNumber: string;
}
