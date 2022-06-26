import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const kafkaConfig = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: process.env.KAFKA,
      brokers: [process.env.KAFKA_BROKER]
    },
    consumer: {
      groupId: !process.env.KAFKA_CONSUMER_GROUP_ID ||
        process.env.KAFKA_CONSUMER_GROUP_ID === ''
        ? 'my-consumer-' + Math.random() : process.env.KAFKA_CONSUMER_GROUP_ID
    }
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.connectMicroservice(kafkaConfig)
  await app.startAllMicroservices()
  await app.listen(3000);
}
bootstrap();
