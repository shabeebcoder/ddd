import { RentalAgreementEntity } from '../../entities/rental-agreement.entity';

export abstract class CreateRentalAgreementOutPort {
  abstract createRentalAgreement(
    rentalAgreement: RentalAgreementEntity,
  ): Promise<RentalAgreementEntity>;
}
