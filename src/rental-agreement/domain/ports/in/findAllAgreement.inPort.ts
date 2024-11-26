import { RentalAgreementEntity } from '../../entities/rental-agreement.entity';

export abstract class FindAllAgreementIntPort {
  abstract execute(): Promise<RentalAgreementEntity[]>;
}
