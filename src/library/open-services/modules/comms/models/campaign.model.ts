import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { CommsEvent } from './event.model';
import { CommsTemplate } from './template.model';

@JsonApiModelConfig({
  type: 'campaigns'
})
export class CommsCampaign extends JsonApiModel {
  @Attribute({ serializedName: 'owner_id' })
  ownerId: number;

  @Attribute({ serializedName: 'owner_type' })
  ownerType: string;

  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @Attribute({ serializedName: 'created_at' })
  updatedAt: string;

    // @Attribute({ serializedName: 'cognito_endpoint_id' })
  cognitoEndpointId: number;

  @HasMany()
  events: CommsEvent[];

  @HasMany()
  templates: CommsTemplate[];
}
