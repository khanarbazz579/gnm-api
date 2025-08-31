import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
} from "class-validator";
import { RoleStatus } from "./role.model";

export class RoleDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "The name of the role (e.g., admin, executive)" })
  readonly name: string;

  @IsOptional()
  @IsEnum(RoleStatus)
  @ApiProperty({ description: "Status of the role", enum: RoleStatus })
  readonly status: RoleStatus;

  @IsOptional()
  @IsObject()
  @ApiProperty({
    description: "Additional non-structured information",
    required: false,
  })
  readonly meta: any;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who created the role" })
  readonly createdById: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who last updated the role" })
  readonly updatedById: number;
}
