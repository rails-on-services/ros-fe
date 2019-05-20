import { CommsTemplate } from './template.model';
import { JsonApiModel, JsonApiModelConfig, Attribute, BelongsTo } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CommsCampaign } from './campaign.model';
import { CommsProvider } from './provider.model';
import { CommsMessage } from './message.model';

@Tablify()
@JsonApiModelConfig({
  type: 'events'
})
export class CommsEvent extends JsonApiModel {
  @Column({ name: 'Event Name', sortable: true })
  @Attribute()
  name: string;

  @Column({ name: 'channel' })
  @Attribute()
  channel: string;

  @Attribute({ serializedName: 'urn' })
  urn: string;

  @Column({ name: 'Send At' })
  @Attribute({ serializedName: 'send_at' })
  sendAt: string;

  @Column({ name: 'Status' })
    // @Attribute()
  status: string;

  @Column({ name: 'Created At' })
  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @Column({ name: 'Updated At' })
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
