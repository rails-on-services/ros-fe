import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { Column, Tablify } from '../../../shared/decorators/column.decorator';

@Tablify()
@JsonApiModelConfig({
  type: 'applications'
})
export class CognitoApplication extends JsonApiModel {
  @Column({ name: 'Application Name', sortable: true })
  @Attribute()
  name: string;

  @Column({ name: 'URN' })
  @Attribute()
  urn: string;

  @Column({ name: 'Creation Time' })
  @Attribute({ serializedName: 'created_at'})
  creationTime: Date;
}
