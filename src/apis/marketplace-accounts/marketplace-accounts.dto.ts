import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum MarketplaceAccountsStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

export enum Marketplaces {
  AMAZON_VC = "amazon_vc",
  AMAZON_SC = "amazon_sc",
  AMAZON_SP = "amazon_sp",
  FLIPKART = "flipkart",
  MYNTRA = "myntra",
  NYKAA = "nykaa",
  BLINKIT_MARKETPLACE = "blinkit_marketplace",
  BLINKIT = "blinkit",
}

export class MarketplaceAccountsDto {

  @IsNotEmpty()
  @IsEnum(Marketplaces)
  @ApiProperty()
  readonly marketplace: Marketplaces;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly accountId: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  readonly isOtpLogin: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsNotEmpty()
  @IsEnum(MarketplaceAccountsStatus)
  @ApiProperty()
  readonly status: MarketplaceAccountsStatus;
    
@IsOptional()
@IsNumber()
@ApiProperty()
readonly createdById: number;

@IsOptional()
@IsNumber()
@ApiProperty()
readonly updatedById: number;
}


export class ConnectAccountsDto {

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly accountId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly marketplace: Marketplaces;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly userName: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly userEmail: string;


  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly password: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly displayName: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  readonly organizationId: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly redirectUrl: string;

  }



  