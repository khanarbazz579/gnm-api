import { ApiProperty } from "@nestjs/swagger";
import {
  IsNumber,
  IsOptional,
  IsObject,
  IsEnum,
  IsNotEmpty,
} from "class-validator";
import { OrganizationUserStatus } from "./organisation-users.model";

export class OrganizationUsersDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "ID of the organization" })
  readonly organizationId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "ID of the user" })
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "ID of the role" })
  readonly roleId: number;

  @IsEnum(OrganizationUserStatus)
  @IsNotEmpty()
  @ApiProperty({
    description: "Status of the user-organization link",
    enum: OrganizationUserStatus,
  })
  readonly status: OrganizationUserStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
  })
  readonly meta: any;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who created the record" })
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who last updated the record" })
  readonly updatedById: number;
}
