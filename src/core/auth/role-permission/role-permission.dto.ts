import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsEnum } from "class-validator";
import { RolePermissionStatus } from "./role-permission.model";

export class RolePermissionsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "ID of the role" })
  readonly roleId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "ID of the permission" })
  readonly permissionId: number;

  @IsOptional()
  @IsEnum(RolePermissionStatus)
  @ApiProperty({
    description: "Status of the role-permission mapping",
    enum: RolePermissionStatus,
  })
  readonly status: RolePermissionStatus;
}
