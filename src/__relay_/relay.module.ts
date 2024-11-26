import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageOrmEntity } from './message.orm-entity';
import { ClientsModule } from '@nestjs/microservices';
import { kafkaClientOptions } from './kafka-client';
import { RelayService } from './relay.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageOrmEntity]),
    ClientsModule.register([kafkaClientOptions]),
  ],
  controllers: [],
  providers: [RelayService],
  exports: [],
})
export class RelayModule {}
