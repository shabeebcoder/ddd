import { RentalAgreementEntity } from '../../entities/rental-agreement.entity';

export abstract class FindAllAgreementOutPort {
  abstract findAllAgreement(): Promise<RentalAgreementEntity[]>;
}
