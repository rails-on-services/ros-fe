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
  name: string;

  @Attribute()
  channel: string;

  @Attribute({ serializedName: 'urn' })
  urn: string;

  @Attribute({ serializedName: 'send_at' })
  sendAt: string;

    // @Attribute()
  status: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @Attribute({ serializedName: 'updated_at' })
  updatedAt: string;

  @Attribute({ serializedName: 'target_id' })
  targetId: number;

  @Attribute({ serializedName: 'target_type'})
  targetType: string;

  @BelongsTo()
  provider: CommsProvider;

  @BelongsTo()
  campaigns: CommsCampaign;

  @BelongsTo()
  templates: CommsTemplate;

  @BelongsTo()
  message: CommsMessage;

}
