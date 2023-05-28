import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';

@Controller()
export class SensorMqttController {
  @MessagePattern('sensor/temperature/+')
  receiveTemperature(@Payload() temperature: number, @Ctx() ctx: MqttContext) {
    const [_, __, macAddress] = ctx.getTopic().split('/');
    console.log('topic', ctx.getTopic());
    console.log('MAC: ', macAddress);
    console.log('received', temperature);
  }
}
