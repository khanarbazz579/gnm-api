import { Module } from "@nestjs/common";
import { CanCommonService } from "./common.service";
import { CanTextParserService } from "./helpers/parser/text-parser.service";
import { CanPermissionModule } from "./permissions/permissions.module";
import { CanExcelExportService } from "./services/export-response/excel-export.service";
import { CanFileService } from "./services/files/file.service";
import { CanCsvParserService } from "./services/parser/csv-parser.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  providers: [
    CanCommonService,
    CanTextParserService,
    CanCsvParserService,
    CanFileService,
    CanExcelExportService,
  ],
  exports: [
    CanCommonService,
    CanPermissionModule,
    CanTextParserService,
    CanCsvParserService,
    CanFileService,
  ],
  imports: [CanPermissionModule, HttpModule],
})
export class CanCommonModule {}
