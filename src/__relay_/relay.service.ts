import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessageOrmEntity } from './message.orm-entity';

@Injectable()
export class RelayService {
  constructor(
    @Inject('nestjs-client') private readonly kafkaClient: ClientKafka,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron(): Promise<void> {
    console.log('Called when the current second is 45');
    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        const messages = await transactionalEntityManager
          .createQueryBuilder()
          .from(MessageOrmEntity, 'outbox')
          .where('outbox.published = :published', { published: false })
          .orderBy('outbox.createdAt', 'DESC')
          .setLock('pessimistic_partial_write')
          .take(100)
          .getRawMany();

        const ids = [];

        for (const event of messages) {
          ids.push(event.id);
          console.log('run publishing: ' + event.id);
          this.kafkaClient.emit('my-topic', event).subscribe();
        }

        if (messages.length) {
          await transactionalEntityManager
            .createQueryBuilder()
            .from(MessageOrmEntity, 'outbox')
            .delete()
            .from(MessageOrmEntity)
            .where('id IN (:...id)', { id: ids })
            .execute();
        }
      });
    } catch (err) {
      console.log('published error: ' + err.message);
    }
  }
}
