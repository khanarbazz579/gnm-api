import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
} from "class-validator";
import { AppPermissionStatus } from "./app-permissions.model";

export class AppPermissionsDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "ID of the application this permission belongs to",
    example: 1,
  })
  readonly appId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The action allowed (e.g., CREATE_REPORT, VIEW_USERS)",
    example: "CREATE_REPORT",
  })
  readonly action: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "The entity the action applies to (e.g., Report, User)",
    example: "Report",
  })
  readonly subject: string;

  @IsOptional()
  @IsEnum(AppPermissionStatus)
  @ApiProperty({
    description: "Status of the app permission",
    enum: AppPermissionStatus,
    default: AppPermissionStatus.ACTIVE,
  })
  readonly status?: AppPermissionStatus;
}
