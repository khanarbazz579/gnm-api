import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsEnum,
} from "class-validator";
import { OrganizationAddressStatus } from "./organization-addresses.model";

export class OrganizationAddressesDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: "ID of the organization this address belongs to",
  })
  readonly organizationId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The address" })
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The city" })
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The state or province" })
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The postal or ZIP code" })
  readonly postalCode: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "The country" })
  readonly country: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "The GST identification number for this address",
    required: false,
  })
  readonly gstNumber: string;

  @IsEnum(OrganizationAddressStatus)
  @ApiProperty({
    description: "Status of the address",
    enum: OrganizationAddressStatus,
  })
  readonly status: OrganizationAddressStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
  })
  readonly meta: any;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who created the address" })
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who last updated the address" })
  readonly updatedById: number;
}
