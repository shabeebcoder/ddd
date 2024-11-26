import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderInPort } from '../domain/ports/in/create-order.inPort';
import { FindOrdersInPort } from '../domain/ports/in/find-orders.inPort';
import { CreateOrderDto } from './dtos/create-order.dto';

@Controller('order-management')
export class OrderManagementController {
  constructor(
    private createOrderInPort: CreateOrderInPort,
    private findOrdersInPort: FindOrdersInPort,
  ) {}
  @Post('/')
  createOrder(@Body() body: CreateOrderDto) {
    return this.createOrderInPort.execute(body);
  }
  @Get('/')
  getOrders() {
    return this.findOrdersInPort.execute();
  }
}
