import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
// import { CommsEvent } from './event.model';

@JsonApiModelConfig({
  type: 'messages'
})
export class CommsMessage extends JsonApiModel {
    // @Attribute()
  public name: string;

  @Attribute()
  public channel: string;

  @Attribute()
  public from: string;

  @Attribute({ serializedName: 'owner' })
  public ownerType: string;

  @Attribute()
  public to: string;

  @Attribute()
  public body: string;

  // @Attribute({ serializedName: 'provider_id' })
  // providerId: string;

  // @BelongsTo()
  // event: CommsEvent;
}
