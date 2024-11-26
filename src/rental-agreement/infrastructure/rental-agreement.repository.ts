import { RentalAgreementEntity } from '../domain/entities/rental-agreement.entity';
import { CreateRentalAgreementOutPort } from '../domain/ports/out/create-rental-agreement.outPort';
import { FindAllAgreementOutPort } from '../domain/ports/out/findAllAgreement.outPort';

export class RentalAgreementRepository
  implements CreateRentalAgreementOutPort, FindAllAgreementOutPort
{
  constructor() {
    console.log('RentalAgreementRepository instance created');
  }

  rentalAgreements: RentalAgreementEntity[] = [];
  async createRentalAgreement(
    rentalAgreement: RentalAgreementEntity,
  ): Promise<RentalAgreementEntity> {
    this.rentalAgreements.push(rentalAgreement);
    return this.rentalAgreements[0];
  }
  async findAllAgreement(): Promise<RentalAgreementEntity[]> {
    return this.rentalAgreements;
  }
}
