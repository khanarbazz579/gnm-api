import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsEnum, IsNotEmpty } from "class-validator";
import { Status } from "src/common/enums/status.enum";

export class AppRolePermissionsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: "ID of the role", required: true, example: 101 })
  readonly roleId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "ID of the permission",
    required: true,
    example: 5,
  })
  readonly permissionId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "ID of the application",
    required: true,
    example: 1,
  })
  readonly appId: number;

  @IsOptional()
  @IsEnum(Status)
  @ApiProperty({
    description: "Status of the mapping",
    enum: Status,
    default: Status.ACTIVE,
  })
  readonly status?: Status;
}
