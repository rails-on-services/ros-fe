import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';
import { ColumnName, Tablify } from '../decorators/column-name.decorator';

@Tablify()
@JsonApiModelConfig({
  type: 'users'
})
export class IamUser extends JsonApiModel {
  @ColumnName('User Name')
  @Attribute()
  username: string;

  @ColumnName('URN')
  @Attribute()
  urn: string;

  @ColumnName('Console Access')
  @Attribute({ serializedName: 'console' })
  consoleAccess: boolean;

  @ColumnName('API Access')
  @Attribute({ serializedName: 'api' })
  apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};
}
