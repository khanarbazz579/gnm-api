import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "src/common/enums/status.enum";

export class UserAppRolePermissionsDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "ID of the app role", required: true })
  readonly appRoleId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "ID of the app permission", required: true })
  readonly appPermissionId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "ID of the application", required: true })
  readonly appId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: "ID of the user", required: true })
  readonly userId: number;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({ description: "Status of the mapping", enum: Status })
  readonly status?: Status;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who created the mapping" })
  readonly createdById?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: "ID of the user who last updated the mapping" })
  readonly updatedById?: number;
}
