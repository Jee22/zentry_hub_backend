import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './database/prisma/prisma.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const mqttListener = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: configService.get<string>('MQTT_BROKER_URL'),
    },
  });

  /** 서버 종료시 Prisma 종료 Hook */
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.startAllMicroservices();
  await app.listen(configService.get<number>('APP_PORT'));
}

bootstrap();
