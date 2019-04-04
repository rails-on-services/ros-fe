import { JsonApiModel, JsonApiModelConfig, Attribute } from 'angular2-jsonapi';

@JsonApiModelConfig({
  type: 'users'
})
export class IamUser extends JsonApiModel {
  // constructor(public id: number | string, public username: string) { }
  @Attribute()
  username: string;

  @Attribute()
  urn: string;

  @Attribute({ serializedName: 'console' })
  consoleAccess: boolean;

  @Attribute({ serializedName: 'api' })
  apiAccess: boolean;

  @Attribute({ serializedName: 'attached_policies' })
  attachedPolicies: {};

  @Attribute({ serializedName: 'attached_actions' })
  attachedActions: {};
}
