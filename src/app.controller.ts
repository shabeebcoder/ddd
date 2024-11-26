import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}
  onModuleInit() {
    console.log('The module has been initialized.');
  }

  @EventPattern('my-topic')
  handleMessage(@Payload() message: any) {
    console.log('Received message - controller:', message);
  }

  @Get()
  getHello() {
    return this.appService.sendMessage();
  }
}
