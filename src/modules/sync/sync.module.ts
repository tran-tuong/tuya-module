import { Module, forwardRef } from '@nestjs/common';
import { SyncService } from './sync.service';
import { TuyaModule } from '../tuya/tuya.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [forwardRef(() => TuyaModule), PrismaModule],
  providers: [SyncService],
  exports: [SyncService]
})
export class SyncModule {}
