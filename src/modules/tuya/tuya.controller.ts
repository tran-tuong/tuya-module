import { Controller, Get, Query } from '@nestjs/common';
import { SyncService } from '../sync/sync.service';
import { TuyaService } from './tuya.service';

@Controller('tuya')
export class TuyaController {
  constructor(
    private readonly syncService: SyncService,
    private tuyaService: TuyaService,
  ) {}

  @Get('devices')
  async getAllDevices(@Query('pageSize') pageSize: number) {
    const devices = await this.syncService.getAllDevices(Number(pageSize) || 10);
    return {
      message: 'All devices fetched successfully',
      devices,
    };
  }

  // @Get('sync-devices')
  // async syncDevices() {
  //   try {
  //     const syncedDevice = await this.syncService.syncDevices();
  //     return {
  //       message: 'Devices synchronized successfully',
  //       devices: syncedDevice,
  //     };
  //   } catch (error) {
  //     return { message: 'Error synchronizing devices', error: error.message };
  //   }
  // }
}
