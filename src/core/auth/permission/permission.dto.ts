import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { PermissionStatus } from "./permission.model";

export class PermissionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The action allowed (e.g., CREATE_REPORT, VIEW_USERS)",
  })
  readonly action: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The entity the action applies to (e.g., Report, User)",
  })
  readonly subject: string;

  @IsOptional()
  @IsEnum(PermissionStatus)
  @ApiProperty({
    description: "Status of the permission",
    enum: PermissionStatus,
  })
  readonly status: PermissionStatus;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who created the permission" })
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: "ID of the user who last updated the permission",
  })
  readonly updatedById: number;
}
