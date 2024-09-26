import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import { SyncService } from '../sync/sync.service';

@Injectable()
export class TuyaService {
  @Inject(forwardRef(() => SyncService))
  private readonly syncService: SyncService;
  private tuya;

  constructor() {
    this.tuya = new TuyaContext({
      accessKey: process.env.TUYA_API_KEY,
      secretKey: process.env.TUYA_API_SECRET,
      baseUrl: 'https://openapi.tuyaus.com',
    });
  }

  async getDevices(pageSize: number) {
    try {
      const response = await this.tuya.request({
        path: `/v2.0/cloud/thing/device?page_size=${pageSize}`,
        method: 'GET',
        body: {},
      });
      return response;
    } catch (error) {
      console.error('Error fetching devices from Tuya:', error);
      throw error;
    }
  }
}
