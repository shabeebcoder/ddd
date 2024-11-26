// kafka.client.ts

import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const kafkaClientOptions: ClientProviderOptions = {
  name: 'nestjs-client',
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'nestjs-client',
      brokers: ['localhost:9092'], // Your Kafka broker address
    },
    consumer: {
      groupId: 'nestjs-group', // Unique group ID for your service
    },
  },
};
