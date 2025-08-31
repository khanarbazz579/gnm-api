import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { CredentialsService } from './credentials.service';
import { CommonModule } from 'src/common/common.module';

@Module({
    imports: [CommonModule],
    controllers: [CredentialsController],
    providers: [CredentialsRepository, CredentialsService],
    exports: [CredentialsService]
})
export class CredentialsModule { }
