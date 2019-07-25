import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
// import { CommsEvent } from './event.model';

@JsonApiModelConfig({
  type: 'messages'
})
export class CommsMessage extends JsonApiModel {
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
