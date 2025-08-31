import { IsString, IsInt, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CredentialsDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  credType: string;

  @IsString()
  companyCode: string;

  @IsString()
  accountId: string;

  @IsInt()
  clientId: number;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  updatedAt?: Date;
}
