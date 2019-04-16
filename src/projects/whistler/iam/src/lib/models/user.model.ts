import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { Column, Tablify } from '../decorators/column.decorator';

@Tablify()
@JsonApiModelConfig({
  type: 'users'
})
export class IamUser extends JsonApiModel {
  @Column({ name: 'User Name', sortable: true })
  @Attribute()
  username: string;

  @Column({ name: 'URN' })
  @Attribute()
  urn: string;

  @Column({ name: 'Console Access' })
  @Attribute({ serializedName: 'console' })
  consoleAccess: boolean;

  @Column({ name: 'API Access' })
  @Attribute({ serializedName: 'api' })
  apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};
}
