import { RentalAgreementEntity } from '../entities/rental-agreement.entity';
import { CreateAgreementInPort } from '../ports/in/create-agreement.inPort';
import { CreateRentalAgreementOutPort } from '../ports/out/create-rental-agreement.outPort';
import { TenantEntity } from '../entities/tenant.entity';
import { LandlordEntity } from '../entities/landlord.entity';
import { PropertyEntity } from '../entities/proeprty.entity';

export class CreateAgreementUseCase implements CreateAgreementInPort {
  constructor(
    private readonly createRentalAgreement: CreateRentalAgreementOutPort,
  ) {}
  async execute(createAgreementParams): Promise<RentalAgreementEntity> {
    const newAgreement = new RentalAgreementEntity({
      tenant: new TenantEntity({
        name: createAgreementParams.tenantName,
        address: createAgreementParams.tenantAddress,
        identificationType: createAgreementParams.tenantIdentification,
        identificationNumber: createAgreementParams.tenantIdentificationNumber,
        type: createAgreementParams.typeOfTenant,
      }),
      landlord: new LandlordEntity({
        landlordName: createAgreementParams.landlordName,
        address: createAgreementParams.landlordAddress,
        identificationType: createAgreementParams.landlordIdentification,
        identificationNumber:
          createAgreementParams.landlordIdentificationNumber,
        type: createAgreementParams.typeOfLandlord,
      }),
      property: new PropertyEntity({
        address: createAgreementParams.propertyAddress,
        numberOfPeopleOwning:
          createAgreementParams.numberOfPeopleOwningProperty,
      }),
      placeOfAgreement: createAgreementParams.placeOfAgreement,
      state: createAgreementParams.state,
      propertyAddress: createAgreementParams.propertyAddress,
      tenancyStartDate: createAgreementParams.tenancyStartDate,
      dayOfMonthPayment: createAgreementParams.dayOfMonthPayment,
      securityDeposit: createAgreementParams.securityDeposit,
      numberOfPeopleOwningProperty:
        createAgreementParams.numberOfPeopleOwningProperty,
      numberOfTenants: createAgreementParams.numberOfTenants,
    });

    return this.createRentalAgreement.createRentalAgreement(newAgreement);
  }
}
