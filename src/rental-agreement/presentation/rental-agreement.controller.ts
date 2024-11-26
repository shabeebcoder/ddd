import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAgreementInPort } from '../domain/ports/in/create-agreement.inPort';
import { CreateRentalAgreementDto } from './dtos/create-rental-agreement.dto';
import { FindAllAgreementQuery } from '../domain/query/findAllAgreement.query';

@Controller('/rental-agreement')
export class RentalAgreementController {
  constructor(
    private createAgreementUseCase: CreateAgreementInPort,
    private findAllAgreementQuery: FindAllAgreementQuery,
  ) {}

  @Post('/')
  async createAgreement(
    @Body() createAgreementParams: CreateRentalAgreementDto,
  ) {
    return this.createAgreementUseCase.execute(createAgreementParams);
  }
  @Get('/')
  async findAllAgreement() {
    return this.findAllAgreementQuery.execute();
  }
}
