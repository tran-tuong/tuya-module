import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
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

  // Fetch all devices and sync them with the database
  async syncAllDevices(pageSize: number) {
    try {
      // Fetch all devices from Tuya
      const devicesResponse = await this.tuyaService.getDevices(pageSize);
      // console.log('Devices response:', devicesResponse);
      const devices = devicesResponse.result;

      if (!devices || !Array.isArray(devices)) {
        throw new Error(
          'Devices are not iterable or not found in the response',
        );
      }

      // Get the IDs of the devices fetched from Tuya
      const tuyaDeviceIds = new Set(devices.map((device) => device.id));

      // Fetch all devices currently in the database
      const existingDevices = await this.prisma.device.findMany();

      // Iterate over each device and sync with the database
      for (const device of devices) {
        await this.prisma.device.upsert({
          where: { id: device.id },
          update: {
            name: device.name,
            description: device.customName || device.name,
            type: device.category,
            modelName: device.model,
            manufacturerName: device.productName,
            serialNumber: device.uuid,
            firmwareVersion: device.firmwareVersion || null, // Assuming firmwareVersion is available
            hardwareVersion: device.hardwareVersion || null, // Assuming hardwareVersion is available
            macAddress: device.mac || null, // If the mac address is available
            ipAddress: device.ip || null,
            lastOnlineAt: device.isOnline ? new Date() : null,
            updatedAt: new Date(device.updateTime * 1000), // Convert Unix timestamp to Date
          },
          create: {
            id: device.id,
            name: device.name,
            description: device.customName || device.name,
            type: device.category,
            modelName: device.model,
            manufacturerName: device.productName,
            serialNumber: device.uuid,
            firmwareVersion: device.firmwareVersion || null,
            hardwareVersion: device.hardwareVersion || null,
            macAddress: device.mac || null,
            ipAddress: device.ip || null,
            lastOnlineAt: device.isOnline ? new Date() : null,
            status: device.isOnline ? 'online' : 'offline',
            pairedAt: new Date(device.createTime * 1000),
            createdAt: new Date(device.createTime * 1000),
            updatedAt: new Date(device.updateTime * 1000),
          },
        });
      }

      for (const existingDevice of existingDevices) {
        if (!tuyaDeviceIds.has(existingDevice.id)) {
          await this.prisma.device.delete({
            where: { id: existingDevice.id },
          });
          console.log(`Deleted device with ID: ${existingDevice.id}`);
        }
      }

      return {
        message: 'Devices synchronized successfully',
        devicesCount: devices.length,
        devices
      };
    } catch (error) {
      console.log('Error syncing devices from Tuya Cloud:', error);
      throw error;
    }
  }
}
