import { CommsTemplate } from './template.model';
import { JsonApiModel, JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';
import { CommsCampaign } from './campaign.model';
import { CommsProvider } from './provider.model';
import { CommsMessage } from './message.model';

@JsonApiModelConfig({
  type: 'events'
})
export class CommsEvent extends JsonApiModel {
  @Attribute()
  public name: string;

  @Attribute()
  public channel: string;

  @Attribute({ serializedName: 'urn' })
  public urn: string;

  @Attribute({ serializedName: 'send_at' })
  public sendAt: string;

  // @Attribute()
  public status: string;

  @Attribute({ serializedName: 'created_at' })
  public createdAt: string;

  @Attribute({ serializedName: 'updated_at' })
  public updatedAt: string;

  @Attribute({ serializedName: 'target_id' })
  public targetId: number;

  @Attribute({ serializedName: 'target_type'})
  public targetType: string;

  @BelongsTo()
  public provider: CommsProvider;

  @BelongsTo()
  public campaigns: CommsCampaign;

  @BelongsTo()
  public templates: CommsTemplate;

  @BelongsTo()
  public message: CommsMessage;
}
