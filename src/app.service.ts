import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('nestjs-client') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    // Make sure to subscribe to the response topics.
    this.kafkaClient.subscribeToResponseOf('my-topic');
    await this.kafkaClient.connect();
  }

  sendMessage(): void {
    this.kafkaClient.emit('my-topic', 'hellow rold test');
  }
}
