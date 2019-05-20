import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CommsEvent } from './event.model';
import { CommsTemplate } from './template.model';

@Tablify()
@JsonApiModelConfig({
  type: 'campaigns'
})
export class CommsCampaign extends JsonApiModel {
  @Column({ name: 'Owner Id', sortable: true })
  @Attribute({ serializedName: 'owner_id' })
  ownerId: number;

  @Column({ name: 'Owner Type' })
  @Attribute({ serializedName: 'owner_type' })
  ownerType: string;

  @Column({ name: 'Name', sortable: true })
  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @Column({ name: 'Created At' })
  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @Column({ name: 'Updated At' })
  @Attribute({ serializedName: 'created_at' })
  updatedAt: string;

  @Column({ name: 'Assigned Cognito Group ID' })
    // @Attribute({ serializedName: 'cognito_endpoint_id' })
  cognitoEndpointId: number;

  @HasMany()
  events: CommsEvent[];

  @HasMany()
  templates: CommsTemplate[];
}
