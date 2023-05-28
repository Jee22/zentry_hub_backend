import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  findAll() {
    return this.sensorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorService.remove(id);
  }
}
