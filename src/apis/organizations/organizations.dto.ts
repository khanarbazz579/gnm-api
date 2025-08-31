import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsEnum,
} from "class-validator";
import { OrganizationStatus } from "./organizations.model";

export class OrganizationsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The common or display name of the organization",
  })
  readonly displayName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "The legally registered name of the organization",
  })
  readonly legalName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "Corporate Identification Number",
    required: false,
  })
  readonly cin: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: "Permanent Account Number", required: false })
  readonly pan: string;

  @IsEnum(OrganizationStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: "Status of the organization",
    enum: OrganizationStatus,
  })
  readonly status: OrganizationStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
  })
  readonly meta: any;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who created the organization" })
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "ID of the user who last updated the organization",
  })
  readonly updatedById: number;
}
