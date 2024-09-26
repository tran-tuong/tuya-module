import { Module, forwardRef } from '@nestjs/common';
import { TuyaService } from './tuya.service';
import { TuyaController } from './tuya.controller';
import { SyncModule } from '../sync/sync.module';

@Module({
  imports: [forwardRef(() => SyncModule)],
  providers: [TuyaService],
  exports: [TuyaService],
  controllers: [TuyaController],
})
export class TuyaModule {}
