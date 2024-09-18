-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "modelName" TEXT,
    "manufacturerName" TEXT,
    "serialNumber" TEXT,
    "firmwareVersion" TEXT,
    "hardwareVersion" TEXT,
    "pairedAt" TIMESTAMP(3),
    "macAddress" TEXT,
    "ipAddress" TEXT,
    "lastOnlineAt" TIMESTAMP(3),
    "action" BOOLEAN NOT NULL DEFAULT false,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_macAddress_key" ON "Device"("macAddress");
