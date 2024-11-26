import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsIn,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Item {
  @IsNotEmpty()
  @IsString()
  @IsIn(['rental-agreement', 'doorstep-delivery', 'e-signature'])
  type: 'rental-agreement' | 'doorstep-delivery' | 'e-signature';

  @IsOptional()
  @IsString()
  deliveryAddress: string;

  @IsOptional()
  @IsString()
  eSignatureLandlordEmail: string;

  @IsOptional()
  @IsString()
  eSignatureTenantEmail: string;

  @IsOptional()
  @IsString()
  eSignatureLandlordPhone: string;

  @IsOptional()
  @IsString()
  eSignatureTenantPhone: string;

  @IsOptional()
  @IsString()
  rentalAgreementId: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Item)
  orderItems: Item[];
}
