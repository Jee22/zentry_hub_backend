import { Module } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorController } from './sensor.controller';
import { PrismaModule } from '../database/prisma/prisma.module';
import { SensorMqttController } from './sensor.mqtt.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SensorController, SensorMqttController],
  providers: [SensorService],
})
export class SensorModule {}
