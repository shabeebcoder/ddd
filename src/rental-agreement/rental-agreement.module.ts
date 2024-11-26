import { Module } from '@nestjs/common';
import { RentalAgreementController } from './presentation/rental-agreement.controller';
import { CreateAgreementUseCase } from './domain/usecase/create-rental-agreement.usecase';
import { CreateAgreementInPort } from './domain/ports/in/create-agreement.inPort';
import { CreateRentalAgreementOutPort } from './domain/ports/out/create-rental-agreement.outPort';
import { RentalAgreementRepository } from './infrastructure/rental-agreement.repository';
import { FindAllAgreementOutPort } from './domain/ports/out/findAllAgreement.outPort';
import { FindAllAgreementQuery } from './domain/query/findAllAgreement.query';

@Module({
  controllers: [RentalAgreementController],
  providers: [
    RentalAgreementRepository,
    {
      provide: CreateAgreementInPort,
      useFactory: (a) => new CreateAgreementUseCase(a),
      inject: [CreateRentalAgreementOutPort],
    },
    {
      provide: CreateRentalAgreementOutPort,
      useExisting: RentalAgreementRepository,
    },
    {
      provide: FindAllAgreementOutPort,
      useExisting: RentalAgreementRepository,
    },
    {
      provide: FindAllAgreementQuery,
      useFactory: (a) => new FindAllAgreementQuery(a),
      inject: [FindAllAgreementOutPort],
    },
  ],
  exports: [],
})
export class RentalAgreementModule {}
