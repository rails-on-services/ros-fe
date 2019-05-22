import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CommsCampaign } from './campaign.model';

@JsonApiModelConfig({
  type: 'templates'
})
export class CommsTemplate extends JsonApiModel {

  @Attribute()
  content: string;

  @Attribute()
  templatesname: string;

  @Attribute()
  description: string;

  @Attribute({ serializedName: 'status' })
  status: string;

  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @Attribute({ serializedName: 'updated_at' })
  updatedAt: string;

  @HasMany()
  campaigns: CommsCampaign[];

}
