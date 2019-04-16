import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { Column, Tablify } from '../decorators/column.decorator';

@Tablify()
@JsonApiModelConfig({
  type: 'policies'
})
export class IamPolicy extends JsonApiModel {
  @Column({ name: 'Policy Name', sortable: true })
  @Attribute()
  policyname: string;

  @Column({ name: 'URN' })
  @Attribute()
  urn: string;

  // @Column({ name: 'Console Access' })
  // @Attribute({ serializedName: 'console' })
  // consoleAccess: boolean;
  //
  // @Column({ name: 'API Access' })
  // @Attribute({ serializedName: 'api' })
  // apiAccess: boolean;

  @Column({ name: 'Type' })
  @Attribute({ serializedName: 'type' })
  type: string;

  @Column({ name: 'Description' })
  @Attribute({ serializedName: 'description' })
  description: string;

  @Attribute({ serializedName: 'json_summary' })
  policy: {};
}
