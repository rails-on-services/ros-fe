import { JsonApiModel, JsonApiModelConfig, Attribute, HasMany } from 'angular2-jsonapi';
import { CognitoUser } from './user.model';

@JsonApiModelConfig({
  type: 'pools'
})
export class CognitoPool extends JsonApiModel {
  @Attribute()
  public poolname: string;

  @HasMany()
  public users: CognitoUser[];

  @Attribute()
  public urn: string;

  public type: string = 'pool';

  // @Attribute({ serializedName: 'attached_policies' })
  public attachedPolicies: {};

  // @Attribute({ serializedName: 'attached_actions' })
  public attachedActions: {};

  @Attribute({ serializedName: 'created_at'})
  public creationTime: Date;
}
