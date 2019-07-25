import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { CommsCampaign } from './campaign.model';

@JsonApiModelConfig({
  type: 'templates'
})
export class CommsTemplate extends JsonApiModel {

  @Attribute()
  public content: string;

  @Attribute()
  public templatesname: string;

  @Attribute()
  public description: string;

  @Attribute({ serializedName: 'status' })
  public status: string;

  @Attribute({ serializedName: 'created_at' })
  public createdAt: string;

  @Attribute({ serializedName: 'updated_at' })
  public updatedAt: string;

  @HasMany()
  public campaigns: CommsCampaign[];
}
