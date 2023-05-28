import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { RouterService } from './router.service';

@Controller()
export class RouterMqttController {
  constructor(private routerService: RouterService) {}

  @MessagePattern('hello/+')
  receiveHello(@Payload() payload: unknown, @Ctx() ctx: MqttContext) {
    console.log('topic', ctx.getTopic());
    console.log('received', payload);
  }

  @MessagePattern('router/connect/+')
  async onRouterConnect(
    @Payload() routerName: string,
    @Ctx() ctx: MqttContext,
  ) {
    const [_, __, macAddress] = ctx.getTopic().split('/');
    console.log('topic', ctx.getTopic());
    console.log('router name: ', routerName);

    await this.routerService.onRouterConnect({
      mac: macAddress,
      name: routerName,
    });
  }
}
