import { DomainMessage } from 'src/__lib__/domain-message';
import { MessageOrmEntity } from './message.orm-entity';

export class OutboxMapper {
  static mapToOrm<Payload>(
    event: DomainMessage<Payload>,
    coerelationId: string,
  ): MessageOrmEntity {
    const orm = new MessageOrmEntity();
    orm.payload = event.payload;
    orm.reason = event.reason;
    orm.messageType = event.messageType;
    orm.messageName = event.messageName;
    orm.aggregateId = event.aggregateId;
    orm.aggregateName = event.aggregateName;
    orm.contextName = event.contextName;
    orm.correlationId = coerelationId;
    return orm;
  }
}
