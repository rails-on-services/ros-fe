import { JsonApiModel, JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
// import { CommsEvent } from './event.model';

@JsonApiModelConfig({
  type: 'messages'
})
export class CommsMessage extends JsonApiModel {
  @Column({ name: 'name', sortable: true })
    // @Attribute()
  name: string;

  @Attribute()
  channel: string;

  @Attribute()
  from: string;

  @Attribute({ serializedName: 'owner' })
  ownerType: string;

  @Attribute()
  to: string;

  @Attribute()
  body: string;

  // @Attribute({ serializedName: 'provider_id' })
  // providerId: string;

  // @BelongsTo()
  // event: CommsEvent;
}
