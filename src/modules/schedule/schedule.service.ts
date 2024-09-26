import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SyncService } from '../sync/sync.service';


@Injectable()
export class ScheduleService {
  constructor(private readonly syncService: SyncService) {}

  // @Cron('*/5 * * * *') // Runs every 5 minutes
  // async handleCron() {
  //   await this.syncService.syncDevices();
  // }
}
