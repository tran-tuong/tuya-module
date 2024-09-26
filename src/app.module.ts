import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DevicesModule } from './modules/devices/devices.module';
import { TuyaModule } from './modules/tuya/tuya.module';
import { SyncModule } from './modules/sync/sync.module';
import { ScheduleModule } from './modules/schedule/schedule.module';

@Module({
  imports: [DevicesModule, TuyaModule, SyncModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
