import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { TuyaService } from '../tuya/tuya.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SyncService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => TuyaService))
    private readonly tuyaService: TuyaService,
  ) {}

  async getAllDevices(pageSize: number) {
    try {
      const devices = await this.tuyaService.getDevices(pageSize);
      return devices.result; // Return the devices from Tuya Cloud
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  }

  // async syncDevices() {
  //   try {
  //     // Fetch devices from Tuya API
  //     const response = await this.tuyaService.getDevices();

  //     // Assuming the devices are inside a 'result' array in the response
  //     const devices = response.result || [];

  //     // Check if devices is an array
  //     if (Array.isArray(devices)) {
  //       const syncedDevices = []; // Create an array to store synced devices

  //       for (const device of devices) {
  //         const deviceData = {
  //           id: device.id,
  //           name: device.name,
  //           description: device.description || '',
  //           type: device.category || 'unknown',
  //           modelName: device.model || null,
  //           manufacturerName: device.manufacturer || null,
  //           serialNumber: device.serial || null,
  //           firmwareVersion: device.firmwareVersion || null,
  //           hardwareVersion: device.hardwareVersion || null,
  //           pairedAt: device.pairedAt ? new Date(device.pairedAt) : null,
  //           macAddress: device.mac || null,
  //           ipAddress: device.ip || null,
  //           lastOnlineAt: device.lastOnline ? new Date(device.lastOnline) : null,
  //           status: device.status,
  //           isOnline: device.online,
  //           data: device, // Store the full device data
  //         };

  //         // Upsert device into the database
  //         const upsertedDevice = await this.prisma.device.upsert({
  //           where: { id: device.id },
  //           update: deviceData,
  //           create: deviceData,
  //         });

  //         // Push the upserted device to the syncedDevices array
  //         syncedDevices.push(upsertedDevice);
  //       }

  //       // Return the list of synced devices
  //       return syncedDevices;
  //     } else {
  //       throw new Error('Devices is not an array.');
  //     }
  //   } catch (error) {
  //     console.error('Error synchronizing devices', error);
  //     throw new Error('Error synchronizing devices');
  //   }
  // }
}
