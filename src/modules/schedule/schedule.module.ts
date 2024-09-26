import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { SyncModule } from '../sync/sync.module';

@Module({
  imports: [SyncModule],
  providers: [ScheduleService]
})
export class ScheduleModule {}
