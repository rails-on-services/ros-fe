import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { IamGroup as Group } from './group.model';

@JsonApiModelConfig({
  type: 'users'
})
export class IamUser extends JsonApiModel {
  @Attribute()
  username: string;

  @Attribute()
  urn: string;

  type = 'user';

  @Attribute({ serializedName: 'console' })
  consoleAccess: boolean;

  @Attribute({ serializedName: 'api' })
  apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};

  @Attribute({ serializedName: 'display_properties' })
  displayProperties: {};

  @HasMany()
  groups: Group[];
}
