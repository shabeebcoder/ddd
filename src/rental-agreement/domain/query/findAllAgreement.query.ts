import { RentalAgreementEntity } from '../entities/rental-agreement.entity';
import { FindAllAgreementIntPort } from '../ports/in/findAllAgreement.inPort';
import { FindAllAgreementOutPort } from '../ports/out/findAllAgreement.outPort';

export class FindAllAgreementQuery implements FindAllAgreementIntPort {
  constructor(
    private readonly findAllAgreementOutPort: FindAllAgreementOutPort,
  ) {}
  execute(): Promise<RentalAgreementEntity[]> {
    return this.findAllAgreementOutPort.findAllAgreement();
  }
}
