import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { CommsEvent } from './event.model';
import { CommsTemplate } from './template.model';

@JsonApiModelConfig({
  type: 'campaigns'
})
export class CommsCampaign extends JsonApiModel {
  @Attribute({ serializedName: 'owner_id' })
  public ownerId: number;

  @Attribute({ serializedName: 'owner_type' })
  public ownerType: string;

  @Attribute()
  public name: string;

  @Attribute()
  public description: string;

  @Attribute({ serializedName: 'created_at' })
  public createdAt: string;

  @Attribute({ serializedName: 'created_at' })
  public updatedAt: string;

  // @Attribute({ serializedName: 'cognito_endpoint_id' })
  public cognitoEndpointId: number;

  @HasMany()
  public events: CommsEvent[];

  @HasMany()
  public templates: CommsTemplate[];
}
