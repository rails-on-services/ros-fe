import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';
import { CommsCampaign } from './campaign.model';

@Tablify()
@JsonApiModelConfig({
  type: 'templates'
})
export class CommsTemplate extends JsonApiModel {

  @Column({ name: 'Content' })
  @Attribute()
  content: string;

  @Column({ name: 'Name', sortable: true })
  @Attribute()
  name: string;

  @Attribute()
  description: string;

  @Column({ name: 'Status' })
  @Attribute({ serializedName: 'status' })
  status: string;

  @Column({ name: 'Created At' })
  @Attribute({ serializedName: 'created_at' })
  createdAt: string;

  @Column({ name: 'Updated At' })
  @Attribute({ serializedName: 'updated_at' })
  updatedAt: string;

  @HasMany()
  campaigns: CommsCampaign[];

}
