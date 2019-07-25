import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { IamGroup as Group } from './group.model';

@JsonApiModelConfig({
  type: 'users'
})
export class IamUser extends JsonApiModel {
  @Attribute()
  public username: string;

  @Attribute()
  public urn: string;

  public type: string = 'user';

  @Attribute({ serializedName: 'console' })
  public consoleAccess: boolean;

  @Attribute({ serializedName: 'api' })
  public apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  public attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  public attachedActions: {};

  @Attribute({ serializedName: 'display_properties' })
  public displayProperties: {};

  @Attribute({ serializedName: 'groups' })
  @HasMany()
  public groups: Group[];
}
